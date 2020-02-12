import React, { Component, Fragment } from 'react'
import FakeCanvasForSave from "./FakeCanvasForSave";
import * as svgSaver from 'save-svg-as-png';
import ReactDOM from 'react-dom'


export class Saver extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSvg: false
        }
    }

    componentDidMount = () => {
        const link = ReactDOM.findDOMNode(this)
        link.addEventListener("click", this.onSaveClick)
    }

    onSaveClick = (e) => {
        e.preventDefault()
        this.setState({showSvg: true})
    }

    onMount = () => {
        svgSaver.saveSvgAsPng(document.getElementById('fakeSVG'), 'curved_line.png', {scale: 2});
        this.setState({showSvg: false})
    }


    render() {
        return (
            <Fragment>
                { this.props.children }
                {
                    this.state.showSvg && <FakeCanvasForSave onMount={this.onMount}/>
                }
            </Fragment>
        )
    }
}

export default Saver
