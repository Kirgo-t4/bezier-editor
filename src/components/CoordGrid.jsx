import React from 'react';


const CoordGrid = (props) => {
    const { maxX, maxY, stepX, stepY } = props
    const countX = Math.floor(maxX/stepX)
    const countY = Math.floor(maxY/stepY)
    console.log(props)
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

export default CoordGrid;

