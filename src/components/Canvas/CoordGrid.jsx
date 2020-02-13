import React from 'react';
import PropTypes from 'prop-types';


const CoordGrid = ({maxX, maxY, stepX, stepY}) => {
    const countX = Math.round(maxX/stepX)
    const countY = Math.round(maxY/stepY)
    return (
        <g>
            {
                [...Array(countX)].map((x, i) => (
                    <path key={i} stroke="green" strokeDasharray="2" strokeWidth="0.2" d={`M${stepX * i} 0 V${maxY}` } />
                ))
            }
                        {
                [...Array(countY)].map((y, i) => (
                    <path key={i} stroke="green" strokeDasharray="2" strokeWidth="0.2" d={`M0 ${stepY * i} H${maxX}` } />
                ))
            }
        </g>
    );
}

CoordGrid.propTypes = {
    maxX: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired,
    stepX: PropTypes.number.isRequired,
    stepY: PropTypes.number.isRequired,
}


export default CoordGrid;

