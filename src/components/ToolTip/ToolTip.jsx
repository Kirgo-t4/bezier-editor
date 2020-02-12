import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

const tooltip_timeout = 800

export class ToolTip extends Component {
    /*
    Выводит всплывающие подсказки при наведении на DOM-элемент
    Внутри компонента должен быть 1 реальный Dom-элемент (не react-компонент)

    css-класс tooltip_custom позволяет редактировать стили извне

    */
    
    constructor(props) {
        super(props)

        this.timeOut = null

        this.state = {
            visible: false,
            top: 0,
            left: 0,
        }
    }

    componentDidMount = () => {
        const rect = ReactDOM.findDOMNode(this)
        rect.addEventListener('mouseenter', this.mouseEnterHandler)
        rect.addEventListener('mousemove', this.mouseMoveHandler)
        rect.addEventListener('mouseleave', this.mouseLeaveHandler)
    }

    mouseEnterHandler = (e) => {
        this.mouseMoveHandler(e)
        this.timeOut = setTimeout(() => {
            this.makeVisible()
        }, tooltip_timeout)
        
    }

    makeVisible = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                visible: true,
            }
        })
    }

    mouseMoveHandler = (e) => {
        this.setState(prevState => {
            return {
                ...prevState,
                top: e.clientY + 10,
                left: e.clientX + 10,
            }
        })
    }

    mouseLeaveHandler = (e) => {
        if (this.timeOut) {
            clearTimeout(this.timeOut)
        }
        if (this.state.visible) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    visible: false
                }
            })
        }
    }



    render() {
        const { text, children } = this.props
        const { top, left, visible } = this.state
        return (
            <Fragment>
                {children}
                <div className="tooltip_289dhbc tooltip_custom" style={{
                    position: 'fixed', top, left, 
                    opacity: visible ? '1' : '0',
                    zIndex: visible ? '100' : '-100',
                    transform: visible ? 'none' : 'translate(0, 30%)' 
                    }}>
                    {text}
                </div>              
            </Fragment>
        )
    }
}

export default ToolTip
