import React from 'react';
import './Field.css';

function Field(props) {
    return (
        <div
            className="field-container"
            style={{ background: `url(/soccer-field-h.svg) no-repeat center center / cover`, position: 'relative' }}
        >
            {props.children}
        </div>
    );
}

export default Field;