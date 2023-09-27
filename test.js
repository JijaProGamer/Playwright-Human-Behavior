import { calculateBezierPoints, Vector2 } from "./index.js"

import { createCanvas, loadImage } from "canvas"
import fs from "fs"

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

const numPoints = 500;
function makeLine(start, controlPoint1, controlPoint2, end) {
  const bezierPoints = calculateBezierPoints(start, controlPoint1, controlPoint2, end, numPoints, 5);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';

  ctx.beginPath();
  ctx.moveTo(bezierPoints[0].x, bezierPoints[0].y);

  for (const point of bezierPoints) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();

  const output = fs.createWriteStream(new URL('./bezier.png', import.meta.url));
  const stream = canvas.createPNGStream();

  stream.pipe(output);
  output.on('finish', () => console.log('Image saved.'));
}

const start = new Vector2(50, 200);
const controlPoint1 = new Vector2(100, 100);
const controlPoint2 = new Vector2(150, 500);
const end = new Vector2(350, 200);

makeLine(start, controlPoint1, controlPoint2, end)