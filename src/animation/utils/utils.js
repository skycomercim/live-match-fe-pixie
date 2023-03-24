import anime from "animejs";
import {createAndDrawAndAnimationPassage, fadeInBall, fadeOutBall} from "./animations/animationsPassage";
import {field_height, field_width} from "../../config/config";
import {mainAnimationEgine} from "../animationEgine/animationEngine";
import events from "../assets/fakeEvents.json";
import store from "../store/store";
import {getTypeEvent} from "./match/utilsMatch";



function randomCoordinatesMax500() {
    return {
        x: Math.floor(Math.random() * 700),
        y: Math.floor(Math.random() * 400)
    };
}

function randomCoordinatesArray() {
    const coordinates = randomCoordinatesMax500();
    return [coordinates.x, coordinates.y];
}

function delayer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

async function createAnimationTimeline(event) {
    const startRealCoordinates = getRealCoordinates(field_width, field_height, event.x, event.y);
    const state = store.getState();
    const eventType = getTypeEvent(event)
    if (eventType === 'pass') {
        // opzioni di set() per posizione iniziale
        anime
            .set('.ballref', {
                translateX: startRealCoordinates.x,
                translateY: startRealCoordinates.y,
            })
    }
    const response = mainAnimationEgine(event);
    if (!!response?.animation) {
        if (Array.isArray(response?.animation)) {
            const tl = anime.timeline({
                autoplay: true
            });
            for (const anim of response?.animation) {
                tl.add(anim);
            }
        } else {
            anime(response?.animation);
            await response?.animation.finished;
        }
        return response?.type
    }
}

/*function addRandomAnimationsWithPrevCoord(ballRef, ball, prevCoord) {
    const newCoord = generateRandomCoordinates(prevCoord);
    drawAndAnimationBall(ballRef, ball, prevCoord, newCoord);
    return newCoord;
}*/

function generateRandomCoordinates(prevCoord) {
    const maxX = 400;
    const maxY = 300;

    const xRange = Math.min(maxX, prevCoord.x + 101) - Math.max(0, prevCoord.x - 100);
    const yRange = Math.min(maxY, prevCoord.y + 101) - Math.max(0, prevCoord.y - 100);

    const x = Math.floor(Math.random() * xRange) + Math.max(0, prevCoord.x - 100);
    const y = Math.floor(Math.random() * yRange) + Math.max(0, prevCoord.y - 100);

    return {
        x: x,
        y: y
    };
}

function convertAnimationInTrailNumber(animationNumber, offset) {
    const animationSPlit = animationNumber.split('px');
    const animationNumberInTrail = parseFloat(animationSPlit[0] + offset);
    //console.log("animationNumberInTrail :: ", animationNumberInTrail);
    //console.log("===========================");
    return animationNumberInTrail.toString() + "px";
}



function getRealCoordinates(fieldWidth, fieldHeight, x_percent, y_percent) {
    // Calcola le coordinate reali basandosi sulle percentuali e le dimensioni del campo
    let offsetX = 15; // Offset a destra e sinistra
    let offsetY = 0; // Offset in alto e basso

    if (x_percent > 50) {
        offsetX = -offsetX;
    }
    if (y_percent > 50) {
        offsetY = 10;
    }

    // Calcola le coordinate reali basandosi sulle percentuali, le dimensioni del campo e l'offset della cornice
    const x_real = fieldWidth * x_percent / 100 + offsetX;
    const y_real = fieldHeight * (1 - y_percent / 100) + offsetY;

    // Restituisce le coordinate reali come un oggetto
    return {
        x: x_real,
        y: y_real
    };
}

function getTeamInMatch(event, matchData) {
    const teamId = event.teamId;
    const position = matchData.teamHome.teamId === teamId
        ? matchData.teamHome
        : matchData.teamAway.teamId === teamId
            ? matchData.teamAway
            : null;
    return position;
}



async function makeAnimation(event) {
    const response = await createAnimationTimeline(event);
    return response;
}



export { randomCoordinatesMax500, randomCoordinatesArray, generateRandomCoordinates,
    convertAnimationInTrailNumber, delayer, generateUniqueId, createAnimationTimeline,
    getRealCoordinates, makeAnimation, getTeamInMatch };