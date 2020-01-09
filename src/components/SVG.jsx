import React from 'react';

const SVG = (props) => {
    return (
        <svg id="svg" viewBox="0 0 500 500">
            {props.children}
        </svg>
    );
}

export default SVG;
