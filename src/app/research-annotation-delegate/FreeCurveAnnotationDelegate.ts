import AbstractAnnotationDelegate from './AbstractAnnotationDelegate';

export default class FreeCurveAnnotationDelegate extends AbstractAnnotationDelegate {

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  end(point: { x: number; y: number }): {x: number, y: number}[] {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this.points;
  }

  move(point: { x: number; y: number }): void {
    this.points.push(point);
    this.drawCurrentInput();
  }

  start(point: { x: number; y: number }): void {
    this.points.push(point);
    this.drawCurrentInput();
  }

  protected drawCurrentInput(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.strokeStyle = this.defaultStrokeStyle;
    this.context.lineWidth = this.defaultLineWidth;
    this.context.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length - 1; i++) {
      this.context.lineTo(this.points[i].x, this.points[i].y);
      this.context.stroke();
    }
  }

}
