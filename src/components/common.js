const CONNECT_DIST = 5;

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

export const detectConnection = (objDetectable, objects) => {
    for (let obj of objects) {
            if (obj === objDetectable) {
                continue
            }
            let x0_obj = obj.points[0].x
            let y0_obj = obj.points[0].y
            let xe_obj = obj.points[obj.points.length - 1].x
            let ye_obj = obj.points[obj.points.length - 1].y
            let x0_drag = objDetectable.points[0].x
            let y0_drag = objDetectable.points[0].y
            let xe_drag = objDetectable.points[objDetectable.points.length - 1].x
            let ye_drag = objDetectable.points[objDetectable.points.length - 1].y
            if ((Math.abs(xe_obj-x0_drag) < CONNECT_DIST) && (Math.abs(ye_obj-y0_drag)) < CONNECT_DIST) {
                return {obj_left: obj, obj_right: objDetectable, type: "straight", points: [obj.points[obj.points.length - 1], objDetectable.points[0]]}
            } else if ((Math.abs(x0_obj-xe_drag) < CONNECT_DIST) && (Math.abs(y0_obj-ye_drag)) < CONNECT_DIST) {
                return {obj_left: objDetectable, obj_right: obj, type: "straight", points: [obj.points[0], objDetectable.points[objDetectable.points.length - 1]] }
            } else if ((Math.abs(x0_obj-x0_drag) < CONNECT_DIST) && (Math.abs(y0_obj-y0_drag)) < CONNECT_DIST) {
                return {obj_left: objDetectable, obj_right: obj, type: "reverse", points: [obj.points[0], objDetectable.points[0]]}
            } else if ((Math.abs(xe_obj-xe_drag) < CONNECT_DIST) && (Math.abs(ye_obj-ye_drag)) < CONNECT_DIST) {
                return {obj_left: objDetectable, obj_right: obj, type: "reverse_endside", points: [obj.points[obj.points.length - 1], objDetectable.points[objDetectable.points.length - 1]] }
            }
    
    }
    return null
    
}