import React, { Component } from 'react';
import { Line } from "./type";

const AddLineHOC = (AddFigure) => {
    return class AddLineHOC extends Component {

        newLine = (startpoint, endpoint) => {
            return [
                {
                    x: startpoint.x,
                    y: startpoint.y,
                },
                {
                    x: endpoint.x,
                    y: endpoint.y,
                },
            ]
        }

        render () {
            return <AddFigure type={Line} newFigure={this.newLine} {...this.props}></AddFigure>
        }
    }
}

export default AddLineHOC;
