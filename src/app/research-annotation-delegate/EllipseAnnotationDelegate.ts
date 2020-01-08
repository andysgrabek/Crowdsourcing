import AbstractAnnotationDelegate from './AbstractAnnotationDelegate';

export default class EllipseAnnotationDelegate extends AbstractAnnotationDelegate {

  private center: {x: number, y: number};
  private majorAxisPoint: {x: number, y: number};
  private minorSemiAxisLength: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  end(point: { x: number; y: number }): {x: number, y: number}[] {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const majorLineAngle = Math.atan2(this.majorAxisPoint.y - this.center.y, this.majorAxisPoint.x - this.center.x);
    this.points = [this.center, this.majorAxisPoint, {
        x: this.center.x + this.minorSemiAxisLength * Math.cos((Math.PI / 2) + majorLineAngle),
        y: this.center.y + this.minorSemiAxisLength * Math.sin((Math.PI / 2) + majorLineAngle)}];
    return this.points.map(ptr => {
      return {x: ptr.x / this.canvas.width, y: ptr.y / this.canvas.height};
    });
  }

  move(point: { x: number; y: number }, event?: MouseEvent): void {
    if (event.buttons === 2 || event.buttons === 3) {
      // if the right mouse button is pressed
      this.minorSemiAxisLength = Math.hypot(point.x - this.center.x, point.y - this.center.y);
    } else {
      // only if the left mouse button is pressed
      this.majorAxisPoint = point;
    }
    this.drawCurrentInput();
  }

  start(point: { x: number; y: number }): void {
    this.center = point;
    this.majorAxisPoint = point;
    this.minorSemiAxisLength = this.canvas.width / 20;
    this.drawCurrentInput();
  }

  protected drawCurrentInput(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.strokeStyle = this.defaultStrokeStyle;
    this.context.lineWidth = this.defaultLineWidth;
    const majorSemiAxisLength = Math.hypot(this.center.x - this.majorAxisPoint.x, this.center.y - this.majorAxisPoint.y);
    this.context.ellipse(
      this.center.x,
      this.center.y,
      majorSemiAxisLength,
      this.minorSemiAxisLength,
      Math.atan2(this.majorAxisPoint.y - this.center.y, this.majorAxisPoint.x - this.center.x),
      0,
      2 * Math.PI);
    this.context.stroke();
  }

}
