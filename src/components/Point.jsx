import React, { Component } from 'react'

export class Point extends Component {

    render() {
        return (
            <circle id={this.props.id} cx={this.props.x} cy={this.props.y} r="5" fill="#ab4328" />
        )
    }
}

export default Point
