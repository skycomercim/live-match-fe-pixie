import anime from "animejs";
import {createAndDrawAndAnimationPassage, fadeInBall, fadeOutBall} from "./animations/animationsPassage";
import {field_height, field_width} from "../../config/config";
import {mainAnimationEgine} from "../animationEgine/animationEngine";
import events from "../assets/fakeEvents.json";
import store from "../store/store";



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
    if (event.type === 'pass') {
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


function convertPercentCoordinates(x_percent, y_percent) {
    // Scambia i valori delle percentuali x e y
    const new_x_percent = y_percent;
    const new_y_percent = x_percent;

    // Restituisce le nuove coordinate percentuali come un oggetto
    return {
        x: new_x_percent,
        y: new_y_percent
    };
}

function getRealCoordinates(field_width, field_height, x_percent, y_percent) {
    const percentCoordinates_vertical = convertPercentCoordinates(x_percent, y_percent);
    // Calcola le coordinate reali
    const x_real = (field_width * percentCoordinates_vertical.x) / 100;
    const y_real = (field_height * percentCoordinates_vertical.y) / 100;

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
    getRealCoordinates, convertPercentCoordinates, makeAnimation, getTeamInMatch };