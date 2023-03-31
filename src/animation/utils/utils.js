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


function convertAnimationInTrailNumber(animationNumber, offset) {
    const animationSPlit = animationNumber.split('px');
    const animationNumberInTrail = parseFloat(animationSPlit[0] + offset);
    //console.log("animationNumberInTrail :: ", animationNumberInTrail);
    //console.log("===========================");
    return animationNumberInTrail.toString() + "px";
}



function getRealCoordinates(fieldWidth, fieldHeight, x_percent, y_percent) {
    // Calcola le coordinate reali basandosi sulle percentuali e le dimensioni del campo
    let offsetX = 0; // Offset a destra e sinistra
    let offsetY = 0; // Offset in alto e basso

    if (x_percent > 95) {
        offsetX = -15;
    }
    if (y_percent > 95) {
        offsetY = -15;
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

function isColorDark(color) {
    // Converte il colore in formato esadecimale in formato RGB
    var rgb = hexToRgb(color);

    // Calcola la luminosità utilizzando la formula HSL
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    var lightness = hsl.l * 100;

    // Determina se il colore è chiaro o scuro
    if (lightness < 50) {
        return true; // il colore è scuro
    } else {
        return false; // il colore è chiaro
    }
}

// Converte un colore esadecimale in un oggetto RGB
function hexToRgb(hex) {
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    return {r, g, b};
}

// Converte un colore RGB in un oggetto HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min){
        h = s = 0; // scala di grigi
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h, s, l };
}




export { randomCoordinatesMax500, randomCoordinatesArray,
    convertAnimationInTrailNumber, delayer, generateUniqueId, createAnimationTimeline,
    getRealCoordinates, makeAnimation, getTeamInMatch, isColorDark };