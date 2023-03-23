import anime from "animejs";
import {createAndDrawAndAnimationPassage, fadeOutBall} from "./animations/animationsPassage";
import {field_height, field_width} from "../../config/config";
import {mainAnimationEgine} from "./animationEngine";


export const timeline = anime.timeline({
    autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
});

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

async function createAnimationTimeline(timeline,event) {

    const startRealCoordinates = getRealCoordinates(field_width, field_height, event.x, event.y);

    // opzioni di set() per posizione iniziale
    timeline
        .set('.ballref', {
            translateX: startRealCoordinates.x,
            translateY: startRealCoordinates.y,
        })


    const animation = mainAnimationEgine(event);
    if (event.type === 'pass') {
        timeline.add(animation);
    } else {
        timeline.add(animation);
    }
  /*  timeline.finished.then(() => {
        timeline.reset();
    })*/
    await animation.finished;
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

function startMatch(ball) {
    const containerWidth = field_width;
    const containerHeight = field_height;
    const ballWidth = 11;
    const ballHeight = 11;

    const midFieldX = containerWidth / 2 - ballWidth / 2; // calcola la coordinata x del centro del pallone
    const midFieldY = containerHeight / 2 - ballHeight / 2; // calcola la coordinata y del centro del pallone

    let prevCoord = {
        x: midFieldX,
        y: midFieldY,
    };

    const timeline = anime.timeline({
        autoplay: true, // imposto autoplay a false per eseguire manualmente la timeline
    });

    timeline
        .set(ball, {
            opacity: 0
        })

    timeline.add({
        targets: ball,
        easing: 'linear',
        translateX: midFieldX,
        translateY: midFieldY,
        opacity: 0,
        complete: () => {
            anime({
                targets: ball,
                opacity: 1,
            })
        }
    });

    return prevCoord;
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



export { randomCoordinatesMax500, randomCoordinatesArray, generateRandomCoordinates,
    convertAnimationInTrailNumber, delayer, generateUniqueId, createAnimationTimeline,
    startMatch, getRealCoordinates, convertPercentCoordinates };