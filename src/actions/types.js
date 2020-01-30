
import { default as UUID } from "uuid";

export const ADD_POINT = "ADD_POINT"
export const ADD_CURVE = "ADD_CURVE"
export const ADD_OBJ = "ADD_CURVE"
export const MOVE = "MOVE"
export const MOVE_ALL = "MOVE_ALL"
export const SHIFT = "SHIFT"
export const SELECT = "SELECT"
export const UNSELECT = "UNSELECT"
export const CONNECT = "CONNECT"
export const REVERSE_CONNECT = "REVERSE_CONNECT"
export const REVERSE_CONNECT_ENDSIDE = "REVERSE_CONNECT_ENDSIDE"
export const SELF_CONNECT = "SELF_CONNECT"

export const RESIZE_SVG = "RESIZE_SVG"
export const CHANGE_MODE = "CHANGE_MODE"

export const type_qcurve = "qcurve"
export const type_ccurve = "ccurve"
export const type_point = "point"
export const type_complex = "complex"
export const type_arc = "arc"
export const type_line = "line"

export const MODE = Object.freeze({
    MOVE: 0,
    ADD_QCURVE: 1,
    ADD_CCURVE: 2
})

export class Point {
    constructor(point, owner = null) {
        this.id = UUID.v4()
        this.type = type_point
        this._x = point.x
        this._y = point.y
        this.owner = owner
        this._offset = {
            x: 0, y: 0
        }
    }

    get x() {
        if (this._offset.x) {
            return this._x + this._offset.x
        }
        return this._x
    }

    get y() {
        if (this._offset.y) {
            return this._y + this._offset.y
        }
        return this._y
    }

    setOffset = (offset) => {
        this._offset.x = offset.x
        this._offset.y = offset.y
        return this
    }

    clearOffset = () => {
        this._offset.x = 0
        this._offset.y = 0
        return this
    }

    move = (coords) => {
        this.clearOffset()
        this._x = coords.x
        this._y = coords.y
        return this
    }
}

export class Figure {
    constructor(points) {
        this.id = UUID.v4()
        this.type = null
        this.offset = {
            x: 0, y: 0
        }
        this._points = points.map((point) => {
            return new Point({x:point.x, y:point.y}, this)
        })
        this.selected = false
    }

    get points() {
        return this._points
    }

    setOffset = (offset) => {
        this.points.forEach((point) => {
            point.setOffset(offset)
        })
        return this
    }

    clearOffset = () => {
        this.points.forEach((point) => {
            point.clearOffset()
        })
        return this
    }

    move = (dcords) => {
        this.clearOffset()
        this.points.forEach((point) => {
            point.move({x: point.x + dcords.x, y: point.y + dcords.y})
        })
        return this
    }

    get svgString() {
        throw new Error("this is an abstract object")
    }

    get helpLines() {
        return []
    }

    reverseFigure() {
        console.log('reverseFigure')
        const points = this.points.slice()
        return new this.constructor(points.reverse())
    }
    
}