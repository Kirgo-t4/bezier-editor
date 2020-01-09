import React, { Component } from 'react';
import { Curve } from "../../figures/CCurve/type";

const AddCCurveHOC = (AddFigure) => {
    return class AddQCurveHOC extends Component {

        newQCurve = (startpoint, endpoint) => {
            return [
                {
                    x: startpoint.x,
                    y: startpoint.y,
                },
                {
                    x: endpoint.x,
                    y: startpoint.y,
                },
                {
                    x: startpoint.x,
                    y: endpoint.y,
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

export default AddCCurveHOC;
