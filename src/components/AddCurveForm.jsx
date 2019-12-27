import React, { Component } from 'react'
import { connect } from "react-redux";
import { addObj } from "../actions/objActions";
import { type_curve } from "../actions/types";

export class AddCurveForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newCurve: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 0,
                    y: 0,
                },
            ]
        }
    }

    onChange = (e) => {
        this.setState( { newCurve: this.state.newCurve.map((curve, index) => {
            if (parseInt(e.target.name[1]) === index) {
                console.log(index)
                return {...curve, [e.target.name[0]]: e.target.value}
            } else {
                return curve
            }
        }) } )
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addCurve(this.state.newCurve)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="number" name="x0" value={this.state.newCurve[0].x} onChange={this.onChange} />
                    <input type="number" name="y0" value={this.state.newCurve[0].y} onChange={this.onChange} /><br />

                    <input type="number" name="x1" value={this.state.newCurve[1].x} onChange={this.onChange} />
                    <input type="number" name="y1" value={this.state.newCurve[1].y} onChange={this.onChange} /><br />

                    <input type="number" name="x2" value={this.state.newCurve[2].x} onChange={this.onChange} />
                    <input type="number" name="y2" value={this.state.newCurve[2].y} onChange={this.onChange} />
                    <button type="submit">Add</button><br />
                </form>   
            </div>
        )
    }
}



export default connect( null, dispatch => {
    return {
        addCurve: point => dispatch(addObj(type_curve, point))
    }
} )(AddCurveForm)
