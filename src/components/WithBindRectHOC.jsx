import React, { Component } from 'react';
import TempRect from "./TempRect";

const WithBindRectHOC = (Figure) => {
    return class WithBindRectHOC extends Component {

        constructor(props) {
            super(props)
            this.state = {
                offset_point0: {
                    x: 0,
                    y: 0,
                },
                width: 0,
                height: 0,
            }
        }
    
        updateSurRect = () => {
            let { obj } = this.refs.fig.refs
            let CTM = obj.ownerSVGElement.getScreenCTM()

            let areaObj = obj.getBoundingClientRect()
            this.setState((prevState) => {
                return {
                    ...prevState,
                    offset_point0: {
                        x: (areaObj.left - CTM.e) / CTM.a - this.props.points[0].x,
                        y: (areaObj.top - CTM.f) / CTM.d - this.props.points[0].y,
                    },
                    width: areaObj.width / CTM.a,
                    height: areaObj.height / CTM.d,
                }
            })
        }
    
        componentDidMount() {
            this.updateSurRect()
        }

        render() {
            let points = this.props.points
            return (
                <g>
                    {this.props.selected && 
                    <TempRect 
                        startpoint={{x: points[0].x + this.state.offset_point0.x, y: points[0].y + this.state.offset_point0.y}} 
                        width={this.state.width}
                        height={this.state.height}
                    /> 
                    }
                    <Figure ref="fig" {...this.props} />
                </g>
            )
        }
    }
}

export default WithBindRectHOC;