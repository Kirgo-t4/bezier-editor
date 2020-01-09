import { Figure } from "../../actions/types";
import { type_ccurve } from "../../actions/types";

export class Curve extends Figure {
    constructor(points) {
        super(points)
        this.type = type_ccurve
    }
}