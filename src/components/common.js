const CONNECT_DIST = 5;
const MIN_COUNT_OF_POINTS_TO_CLOSE_OBJECT = 4;

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

export const detectConnectionArray = (objDetectable, objects) => {
    const connectable = []
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
                connectable.push({obj_left: obj, obj_right: objDetectable, type: "straight", points: [obj.points[obj.points.length - 1], objDetectable.points[0]]})
            } else if ((Math.abs(x0_obj-xe_drag) < CONNECT_DIST) && (Math.abs(y0_obj-ye_drag)) < CONNECT_DIST) {
                connectable.push({obj_left: objDetectable, obj_right: obj, type: "straight", points: [obj.points[0], objDetectable.points[objDetectable.points.length - 1]] })
            } else if ((Math.abs(x0_obj-x0_drag) < CONNECT_DIST) && (Math.abs(y0_obj-y0_drag)) < CONNECT_DIST) {
                connectable.push({obj_left: objDetectable, obj_right: obj, type: "reverse", points: [obj.points[0], objDetectable.points[0]]})
            } else if ((Math.abs(xe_obj-xe_drag) < CONNECT_DIST) && (Math.abs(ye_obj-ye_drag)) < CONNECT_DIST) {
                connectable.push({obj_left: objDetectable, obj_right: obj, type: "reverse_endside", points: [obj.points[obj.points.length - 1], objDetectable.points[objDetectable.points.length - 1]] })
            }
    
    }
    return connectable
}

export const detectConnection = (objDetectable, objects) => {
    const connectable = detectConnectionArray(objDetectable, objects)
    if (connectable.length > 0) {
        return connectable[0]
    }
    return null
}

export const detectConnectionPoint = (pointDetectable, objects) => {
    const detectConnectionResultArray = detectConnectionArray(pointDetectable.owner, objects)
    let connectedResult = false
    if (detectConnectionResultArray.length > 0) {
        detectConnectionResultArray.forEach((detectConnectionResult) => {
            detectConnectionResult.points.forEach((point) => {
                if (point === pointDetectable) {
                    connectedResult = detectConnectionResult
                }
            })
        })

    }
    if (connectedResult) {
        return connectedResult
    }

    const selfDetetctConnectionResult = detectSelfConnection(pointDetectable)

    if (selfDetetctConnectionResult) {
        return selfDetetctConnectionResult[0]
    }
    return null
}


export const detectSelfConnection = (pointDetectable) => {
    const owner = pointDetectable.owner
    if (!(pointDetectable.owner.points[0] === pointDetectable) && !(pointDetectable.owner.points[pointDetectable.owner.points.length - 1] === pointDetectable)) {
        return null
    }

    if (owner.points.length < MIN_COUNT_OF_POINTS_TO_CLOSE_OBJECT) {
        return null
    }

    const points = [pointDetectable.owner.points[0], pointDetectable.owner.points[pointDetectable.owner.points.length - 1]]
    const connectable = []

    if ((Math.abs(points[0].x - points[1].x) < CONNECT_DIST) && (Math.abs(points[0].y - points[1].y) < CONNECT_DIST)) {
        connectable.push({ obj_left: owner, obj_right: owner, type: "self", points })
    }
    return connectable
}
