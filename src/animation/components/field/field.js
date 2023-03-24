import React from 'react';
import './Field.css';

function Field(props) {

    const styleChangeBallLeft = {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "50%",
        height: "100%",
        backgroundColor: "rgba(128, 128, 128, 0.7)",
        opacity: "0",
        zIndex: "10"
    };

    const styleChangeBallRight = {
        position: "absolute",
        top: "0px",
        right: "0px",
        width: "50%",
        height: "100%",
        backgroundColor: "rgba(128, 128, 128, 0.7)",
        opacity: "0",
        zIndex: "10"
    };


    return (
        <div
            className="field-container"
            style={{ background: `url(/soccer-field-h.svg) no-repeat center center / cover`, position: 'relative' }}
        >
            {
                !!props?.changeBallLeft &&
                <div className="changeBallLeft" style={styleChangeBallLeft}></div>
            }
            {
                !!props?.changeBallRight &&
                <div className="changeBallRight" style={styleChangeBallRight}></div>
            }
            {props.children}
        </div>
    );
}

export default Field;