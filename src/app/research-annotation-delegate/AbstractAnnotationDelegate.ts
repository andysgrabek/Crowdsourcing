import {ResearchAnnotationDelegate} from './ResearchAnnotationDelegate';

export default abstract class AbstractAnnotationDelegate implements ResearchAnnotationDelegate {

  protected points: {x: number; y: number}[] = [];
  protected defaultLineWidth = 3;
  protected defaultStrokeStyle = '#ffff00';
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  protected constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  abstract end(point: { x: number; y: number }): { x: number; y: number }[];

  abstract move(point: { x: number; y: number }): void;

  abstract start(point: { x: number; y: number }): void;

  /**
   * Only call internally to draw the annotation before it is converted to a path. Do not call from outside to draw as set of points.
   */
  protected abstract drawCurrentInput(): void;


}
