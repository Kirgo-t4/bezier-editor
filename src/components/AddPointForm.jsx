import React, { Component } from 'react'
import { connect } from "react-redux";
import { addObj } from '../actions/objActions';
import { type_point } from "../actions/types";

export class AddPointForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newPoint: {
                x: 0,
                y: 0,
            }
        }
    }

    onChange = (e) => {
        this.setState( { newPoint: {...this.state.newPoint, [e.target.name]: e.target.value} } )
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addPoint(this.state.newPoint)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="number" name="x" value={this.state.newPoint.x} onChange={this.onChange} />
                    <input type="number" name="y" value={this.state.newPoint.y} onChange={this.onChange} />
                    <button type="submit">Add</button><br />
                </form>   
            </div>
        )
    }
}



export default connect( null, dispatch => {
    return {
        addPoint: point => dispatch(addObj(type_point, point))
    }
} )(AddPointForm)
