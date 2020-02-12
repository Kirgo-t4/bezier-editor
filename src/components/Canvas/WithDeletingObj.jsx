import React, { Component } from 'react'
import { connect } from "react-redux";

import SVG from './SVG'

import { selectObj, unselectObj, deleting } from "../../actions/objActions";

export class WithDeletingObj extends Component {
/*  Компонент добавляет функционал удаления фигур с холста */

    mmHandler = (e) => {
        if (e.target.id && e.target.tagName === "path") {
            this.props.selectObj(e.target.id)
        } else {
            this.props.unSelectObj()
        }
    }

    mcHandler = (e) => {
        this.props.deleting()
    }

    render() {
        return (
            <div className="canvas-inner canvas-inner_delete-mode" onMouseMove={this.mmHandler} onClick={this.mcHandler}>
                <SVG>
                    {this.props.children}
                </SVG>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectObj: (id) => dispatch(selectObj(id)),
        unSelectObj: () => dispatch(unselectObj()),
        deleting: () => dispatch(deleting()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithDeletingObj)
