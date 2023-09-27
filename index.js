import Noise from 'noisejs';

class Vector2 {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function calculateBezierPoints(start, controlPoint1, controlPoint2, end, numPoints, noiseScale) {
    const points = []

    let noise

    if(noiseScale > 0){
        noise = new Noise.Noise(Math.random());
    }

    for (let t = 0; t <= 1; t += 1 / numPoints) {
        let x =
            start.x * Math.pow(1 - t, 3) +
            3 * controlPoint1.x * t * Math.pow(1 - t, 2) +
            3 * controlPoint2.x * Math.pow(t, 2) * (1 - t) +
            end.x * Math.pow(t, 3)

        let y =
            start.y * Math.pow(1 - t, 3) +
            3 * controlPoint1.y * t * Math.pow(1 - t, 2) +
            3 * controlPoint2.y * Math.pow(t, 2) * (1 - t) +
            end.y * Math.pow(t, 3)

        if(noiseScale > 0 && t > 0 && t < 0.95){
            x += noise.simplex2(t * 7, 0) * noiseScale;
            y += noise.simplex2(t * 7, 5000) * noiseScale;
        }

        points.push(new Vector2(x, y))
    }

    return points;
}

export { calculateBezierPoints, Vector2 }