import { Figure, type_complex } from "../../actions/types";


export class Complex extends Figure {
    constructor(figure1, figure2) {
        super([])
        this.type = type_complex
        this._figure1 = figure1
        this._figure2 = figure2
        this.concatFigures(this._figure1, this._figure2)
        this._points = this._figure1.points.concat(figure2.points.slice())
        this._points.forEach((point) => point.owner = this)
    }

    get svgString() {
        const svg_str1 = this._figure1.svgString
        const svg_str2 = this._figure2.svgString
        return svg_str1 + " " + svg_str2.replace(/M[0-9]*[.,]?[0-9]*\s[0-9]*[.,]?[0-9]*\s/, "")
    }

    get helpLines() {
        let lines = []
        lines = lines.concat(this._figure1.helpLines)
        lines = lines.concat(this._figure2.helpLines)
        return lines
    }

    get figure1() {
        return this._figure1
    }

    get figure2() {
        return this._figure2
    }

    static connect(Figure1, Figure2) {
        return new Complex(Figure1, Figure2)
    }

    concatFigures(fig1, fig2) {
        if (fig2.type === type_complex) {
            fig2._points[0] = fig1._points[fig1._points.length - 1]
            this.concatFigures(fig1, fig2.figure1)
        } else {
            fig2._points[0] = fig1._points[fig1._points.length - 1]
        }
    }

    reverseFigure() {
        const fig1 = this._figure1.reverseFigure()
        const fig2 = this._figure2.reverseFigure()
        return new this.constructor(fig2, fig1)
    }

    get points() {
        return this._figure1.points.concat(this._figure2.points.slice(1))
    }
}