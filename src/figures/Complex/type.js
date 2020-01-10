import { Figure, type_complex } from "../../actions/types";


export class Complex extends Figure {
    constructor(figure1, figure2) {
        super([])
        this.type = type_complex
        this._figure1 = figure1
        this._figure2 = figure2
        this._points = this._figure1.points.concat(figure2.points.slice(1))
    }

    get svgString() {
        let svg_str1 = this._figure1.svgString
        let svg_str2 = this._figure2.svgString
        console.log(svg_str1.match(/M[0-9]*[.,]?[0-9]*\s[0-9]*[.,]?[0-9]*\s/))
        console.log(svg_str2.match(/M[0-9]*[.,]?[0-9]*\s[0-9]*[.,]?[0-9]*\s/))
        return svg_str1 + " " + svg_str2.replace(/M[0-9]*[.,]?[0-9]*\s[0-9]*[.,]?[0-9]*\s/, "")
    }

    static connect(Figure1, Figure2) {
        return new Complex(Figure1, Figure2)
    }
}