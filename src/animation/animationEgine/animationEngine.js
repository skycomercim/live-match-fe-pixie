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
import logger from "../../helpers/logger";
import {getTypeEvent} from "../utils/match/utilsMatch";

function mainAnimationEgine(event) {
    let newCoord, prevCoord, animation, realPrevCoordinates, realNewCoordinates;
    let typeEvent = getTypeEvent(event);
    logger("mainAnimationEgine - typeEvent :: ", typeEvent);

    switch (typeEvent) {
        case 'pass':
            fadeInBall();
                prevCoord = {x: event.x, y: event.y};
                newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
                realPrevCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
                logger("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
                realNewCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
                logger("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
                animation = createAndDrawAndAnimationPassage(realPrevCoordinates, realNewCoordinates, event);
                store.dispatch(setEvent(event));
                return {
                    animation: animation,
                    type: 'pass'
                };
            break;
            case 'change_ball_team':
                logger("cambio palla");
                prevCoord = {x: event.x, y: event.y};
                newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
                realPrevCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
                logger("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
                realNewCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
                logger("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
                animation = createAndDrawAndAnimationChangeBallPossession(realPrevCoordinates, realPrevCoordinates, event);
                store.dispatch(setEvent(event));
                return {
                    animation: animation,
                    type: 'change_ball_team'
                };
                break;
        case 'goal':
            logger("goal");
            prevCoord = {x: event.x, y: event.y};
            newCoord = {x: event.payload.goal.GKX, y: event.payload.goal.GKX};
            realPrevCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
            logger("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
            realNewCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
            logger("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
            animation = createAndDrawAndAnimationPassage(realPrevCoordinates, realPrevCoordinates, event);
            store.dispatch(setEvent(event));
            return {
                animation: animation,
                type: 'goal'
            };
            break;
        default:
    }
}

export {mainAnimationEgine};