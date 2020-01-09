export const getSvgCoordsX = (x, CTM) => {
    return (x - CTM.e) / CTM.a
}

export const getSvgCoordsY = (y, CTM) => {
    return (y - CTM.f) / CTM.d
}

export const getRealCoordsOffset = (x, y, CTM, offsetX, offsetY) => {
    return {
        dx: (getSvgCoordsX(x, CTM) - offsetX),
        dy: (getSvgCoordsY(y, CTM) - offsetY),
    }
}