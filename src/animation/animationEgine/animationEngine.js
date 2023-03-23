import {
    createAndDrawAndAnimationChangeBallPossession,
    createAndDrawAndAnimationPassage,
    fadeInBall,
    fadeOutBall
} from "../utils/animations/animationsPassage";
import {getRealCoordinates} from "../utils/utils";
import {field_height, field_width} from "../../config/config";
import store from "../store/store";
import {setEvent} from "../store/eventSlice";

function mainAnimationEgine(event) {
    let newCoord, prevCoord, animation, realPrevCoordinates, realNewCoordinates;
    let typeEvent = event.type;
    const state = store.getState();
    if (event.type === 'pass' && state.event && (state.event.teamId !== event.teamId)) {
        typeEvent = 'change_team';
    }
    switch (typeEvent) {
        case 'pass':
            fadeInBall();
                prevCoord = {x: event.x, y: event.y};
                newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
                realPrevCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
                console.log("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
                realNewCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
                console.log("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
                animation = createAndDrawAndAnimationPassage(realPrevCoordinates, realNewCoordinates, event);
                store.dispatch(setEvent(event));
                return animation;
            break;
            case 'change_team':
                prevCoord = {x: event.x, y: event.y};
                newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
                realPrevCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
                console.log("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
                realNewCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
                console.log("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
                animation = createAndDrawAndAnimationChangeBallPossession(realPrevCoordinates, realPrevCoordinates, event);
                store.dispatch(setEvent(event));
                fadeOutBall();
                return [animation];
                break;
        default:
    }
}

export {mainAnimationEgine};