import React, { Component } from 'react';
import { Arc } from "./type";

const AddArcHOC = (AddFigure) => {
    return class AddArcHOC extends Component {

        newArc = (startpoint, endpoint) => {
            return [
                {
                    x: startpoint.x,
                    y: startpoint.y,
                },
                {
                    x: parseInt(endpoint.x),
                    y: parseInt(startpoint.y),
                },
                {
                    x: endpoint.x,
                    y: endpoint.y,
                },
            ]
        }

        render () {
            return <AddFigure type={Arc} newFigure={this.newArc} {...this.props}></AddFigure>
        }
    }
}

export default AddArcHOC;
