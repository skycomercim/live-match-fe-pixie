import {createAndDrawAndAnimationPassage} from "./animations/animationsPassage";
import {getRealCoordinates} from "./utils";
import {field_height, field_width} from "../../config/config";

function mainAnimationEgine(event) {
    const prevCoord = {x: event.x, y: event.y};
    let newCoord;
    switch (event.type) {
        case 'pass':
            newCoord = {x: event.payload.pass.x, y: event.payload.pass.y};
            const realPrevCoordinates = getRealCoordinates(field_width, field_height, newCoord.x, newCoord.y);
            console.log("realPrevCoordinates :: ",realPrevCoordinates); // { x: 50, y: 12.5 }
            const realNewCoordinates = getRealCoordinates(field_width, field_height, prevCoord.x, prevCoord.y);
            console.log("realNewCoordinates :: ",realNewCoordinates); // { x: 50, y: 12.5 }
            const animation = createAndDrawAndAnimationPassage(realPrevCoordinates, realNewCoordinates, event);
            return animation;
            break;
        default:
    }
}

export {mainAnimationEgine};