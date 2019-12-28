import AbstractAnnotationDelegate from './AbstractAnnotationDelegate';

export default class RectangleAnnotationDelegate extends AbstractAnnotationDelegate {

  private topLeftCorner: {x: number, y: number};
  private bottomRightCorner: {x: number, y: number};

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  private recalculateCorners() {
    const topRightCorner = {x: this.bottomRightCorner.x, y: this.topLeftCorner.y};
    const bottomLeftCorner = {x: this.topLeftCorner.x , y: this.bottomRightCorner.y};
    this.points = [this.topLeftCorner, topRightCorner, this.bottomRightCorner, bottomLeftCorner];
  }

  end(point: { x: number; y: number }): {x: number, y: number}[] {
    this.bottomRightCorner = point;
    this.recalculateCorners();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this.points;
  }

  move(point: { x: number; y: number }): void {
    this.bottomRightCorner = point;
    this.recalculateCorners();
    this.drawCurrentInput();
  }

  start(point: { x: number; y: number }): void {
    this.topLeftCorner = point;
    this.bottomRightCorner = point;
    this.recalculateCorners();
    this.drawCurrentInput();
  }

  protected drawCurrentInput(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.strokeStyle = this.defaultStrokeStyle;
    this.context.lineWidth = this.defaultLineWidth;
    this.context.moveTo(this.points[0].x, this.points[0].y);
    this.context.lineTo(this.points[1].x, this.points[1].y);
    this.context.stroke();
    this.context.lineTo(this.points[2].x, this.points[2].y);
    this.context.stroke();
    this.context.lineTo(this.points[3].x, this.points[3].y);
    this.context.stroke();
    this.context.lineTo(this.points[0].x, this.points[0].y);
    this.context.stroke();
  }

}
