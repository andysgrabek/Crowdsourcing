import AbstractAnnotationDelegate from './AbstractAnnotationDelegate';

export default class CircleAnnotationDelegate extends AbstractAnnotationDelegate {

  private center: {x: number, y: number};
  private hook: {x: number, y: number};

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  end(point: { x: number; y: number }): {x: number, y: number}[] {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.hook = point;
    this.points = [this.center, this.hook];
    return this.points.map(ptr => {
      return {x: ptr.x / this.canvas.width, y: ptr.y / this.canvas.height};
    });
  }

  move(point: { x: number; y: number }): void {
    this.hook = point;
    this.drawCurrentInput();
  }

  start(point: { x: number; y: number }): void {
    this.center = point;
    this.hook = point;
    this.drawCurrentInput();
  }

  protected drawCurrentInput(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.strokeStyle = this.defaultStrokeStyle;
    this.context.lineWidth = this.defaultLineWidth;
    const xDif = this.hook.x - this.center.x;
    const yDif = this.hook.y - this.center.y;
    const radius = Math.sqrt(xDif * xDif + yDif + yDif);
    this.context.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
  }

}
