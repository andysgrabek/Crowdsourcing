import AbstractAnnotationDelegate from './AbstractAnnotationDelegate';

export default class CircleAnnotationDelegate extends AbstractAnnotationDelegate {

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  end(point: { x: number; y: number }): {x: number, y: number}[] {
    return [];
  }

  move(point: { x: number; y: number }): void {
  }

  start(point: { x: number; y: number }): void {
  }

  protected drawCurrentInput(): void {
  }

}
