
import { default as UUID } from "uuid";

export const ADD_POINT = "ADD_POINT"
export const ADD_CURVE = "ADD_CURVE"
export const ADD_OBJ = "ADD_CURVE"
export const MOVE = "MOVE"
export const SHIFT = "SHIFT"
export const SELECT = "SELECT"
export const UNSELECT = "UNSELECT"

export const type_curve = "curve"
export const type_point = "point"

export class Point {
    constructor(point) {
        this.id = UUID.v4()
        this.type = type_point
        this._x = point.x
        this._y = point.y
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

export class Curve {
    constructor(points) {
        this.id = UUID.v4()
        this.type = type_curve
        this.offset = {
            x: 0, y: 0
        }
        this._points = points.map((point) => {
            return new Point({x:point.x, y:point.y})
        })
        this.selected = false
    }

    get points() {
        return this._points
    }

    setOffset = (offset) => {
        this._points.forEach((point) => {
            point.setOffset(offset)
        })
        return this
    }

    clearOffset = (offset) => {
        this._points.forEach((point) => {
            point.clearOffset()
        })
        return this
    }

    move = (dcords) => {
        this.clearOffset()
        this._points.forEach((point) => {
            point.move({x: point.x + dcords.x, y: point.y + dcords.y})
        })
        return this
    }
}