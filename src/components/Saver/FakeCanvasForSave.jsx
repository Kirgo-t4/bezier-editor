import React, { Component } from 'react'
import { connect } from "react-redux";
import Figure from "../../figures/Figure";


export class FakeCanvasForSave extends Component {

    componentDidMount = () => {
        if (typeof this.props.onMount === "function") {
            this.props.onMount()
        }
    }

    render() {
        return (
            <svg id="fakeSVG" viewBox={`0 0 ${this.props.svg_size.x} ${this.props.svg_size.y}`}>
                {
                    this.props.objs.map(obj => 
                        <Figure helpLines={false} helpPoints={false} obj={obj} key={obj.id} />
                    )
                }
            </svg>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs,
        svg_size: state.svg.size,
    }
}

export default connect(mapStateToProps)(FakeCanvasForSave)
