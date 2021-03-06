
import { default as UUID } from "uuid";
import { TFIGURE } from "../const";

export class Point {
    constructor(point, owner = null) {
        this.id = UUID.v4()
        this.type = TFIGURE.POINT
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

    /* Абстракный класс, реализующий общее поведение фигуры на холсте svg */

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
        const points = this.points.slice()
        return new this.constructor(points.reverse())
    }
    
}