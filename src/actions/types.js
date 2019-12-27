
import { default as UUID } from "uuid";

export const ADD_POINT = "ADD_POINT"
export const ADD_CURVE = "ADD_CURVE"
export const ADD_OBJ = "ADD_CURVE"

export const type_curve = "curve"
export const type_point = "point"

export class Point {
    constructor(point) {
        this.id = UUID.v4()
        this.type = type_point
        this.x = point.x
        this.y = point.y
    }
}

export class Curve {
    constructor(points) {
        this.id = UUID.v4()
        this.type = type_curve
        this.points = points.map((point, index) => {
            return new Point({x:point.x, y:point.y})
        })
    }
}