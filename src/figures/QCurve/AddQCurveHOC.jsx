import React, { Component } from 'react';
import { Curve } from "../../figures/QCurve/type";

const AddQCurveHOC = (AddFigure) => {
    return class AddQCurveHOC extends Component {

        newQCurve = (startpoint, endpoint) => {
            return [
                {
                    x: startpoint.x,
                    y: startpoint.y,
                },
                {
                    x: parseInt((startpoint.x + endpoint.x)/1.95),
                    y: parseInt((startpoint.y + endpoint.y)/2.2),
                },
                {
                    x: endpoint.x,
                    y: endpoint.y,
                },
            ]
        }

        render () {
            return <AddFigure type={Curve} newFigure={this.newQCurve} {...this.props}></AddFigure>
        }
    }
}

export default AddQCurveHOC;
