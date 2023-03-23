import {createAndDrawAndAnimationPassage} from "../utils/animations/animationsPassage";
import {getRealCoordinates} from "../utils/utils";
import {field_height, field_width} from "../../config/config";
import store from "../store/store";
import {setEvent} from "../store/eventSlice";

function mainAnimationEgine(event) {
    const prevCoord = {x: event.x, y: event.y};
    let newCoord;
    let typeEvent = event.type;
    const state = store.getState();
    if (event.type === 'pass' && state.event && (state.event.teamId !== event.teamId)) {
        typeEvent = 'change_team';
    }
    switch (typeEvent) {
        case 'pass':
            newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
            const realPrevCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
            console.log("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
            const realNewCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
            console.log("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
            const animation = createAndDrawAndAnimationPassage(realPrevCoordinates, realNewCoordinates, event);
            store.dispatch(setEvent(event));
            return animation;
            break;
            case 'change_team':
                debugger;
                break;
        default:
    }
}

export {mainAnimationEgine};