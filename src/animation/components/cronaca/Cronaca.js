import React from "react";
import {generateUniqueId} from "../../utils/utils";

const Cronaca = ({ cronaca }) => {
    return (
        <>
            <h5>Cronaca Testuale</h5>
            <ul className="cronaca" style={{maxHeight: '210px', overflow: 'hidden'}}>
                {cronaca.map((event) => (
                    <li key={generateUniqueId()} className={`cronaca-${event.type}`}>
                        {event.text}
                    </li>
                ))}
            </ul>

        </>
    );
};

const CronacaLiveDemo = React.memo(
    Cronaca,
    ({ cronaca: oldTl }, { cronaca: newTl }) => oldTl.length === newTl.length
);

export default CronacaLiveDemo;