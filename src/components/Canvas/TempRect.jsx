import React, { Component } from 'react'
import PropTypes from "prop-types";

export class TempRect extends Component {

    /* Прямоугольник по заданным координатам */

    x = () => {
        if (!this.props.endpoint && this.props.endpoint !== 0) {
            return this.props.startpoint.x
        }
        let {startpoint, endpoint} = this.props
        return Math.min(startpoint.x, endpoint.x )
    }

    y = () =>  {
        if (!this.props.endpoint && this.props.endpoint !== 0) {
            return this.props.startpoint.y
        }
        let {startpoint, endpoint} = this.props
        return Math.min(startpoint.y, endpoint.y )
    }

    width = () => {
        if (this.props.width || this.props.width === 0) {
            return(this.props.width)
        } else {
            let {startpoint, endpoint} = this.props
            return Math.abs(startpoint.x - endpoint.x )
        }
    }

    height = () => {
        if (this.props.height || this.props.height === 0) {
            return this.props.height
        } 
        let {startpoint, endpoint} = this.props
        return Math.abs(startpoint.y - endpoint.y )
    }

    render() {
        return (
            <rect 
                x={this.x()} 
                y={this.y()}
                width={this.width()} 
                height={this.height()}
                fill="transparent"
                stroke="black"
                strokeDasharray="8 4"
            />
        )
    }
}

TempRect.propTypes = {
    startpoint: PropTypes.object.isRequired,
    endpoint: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default TempRect
