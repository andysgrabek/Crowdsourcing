import {Injectable} from '@angular/core';
import ResearchAnnotation, {ResearchAnnotationType} from '../dto/ResearchAnnotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationVisualizerService {

  private readonly defaultLineWidth = 1;
  private readonly defaultStrokeStyle = '#ffff00';

  constructor() {

  }

  visualize(annotation: ResearchAnnotation, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    switch (annotation.annotationType) {
      case ResearchAnnotationType.RECTANGLE:
        this.visualizeRectangle(annotation, context, canvas);
        break;
      case ResearchAnnotationType.CIRCLE:
        this.visualizeCircle(annotation, context, canvas);
        break;
      case ResearchAnnotationType.FREE_CURVE:
        this.visualizeFreeCurve(annotation, context, canvas);
        break;
    }
  }

  visualizeCircle(annotation: ResearchAnnotation, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.beginPath();
    context.strokeStyle = this.defaultStrokeStyle;
    context.lineWidth = this.defaultLineWidth;
    const xDif = (annotation.points[1].x - annotation.points[0].x) * canvas.width;
    const yDif = (annotation.points[1].y - annotation.points[0].y) * canvas.height;
    const radius = Math.sqrt(xDif * xDif + yDif + yDif);
    context.arc(annotation.points[0].x * canvas.width, annotation.points[0].y * canvas.height, radius, 0, 2 * Math.PI);
    context.stroke();
  }

  visualizeRectangle(annotation: ResearchAnnotation, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const points = annotation.points.map(point => {
      return { x: point.x * canvas.width, y: point.y * canvas.height };
    });
    context.beginPath();
    context.strokeStyle = this.defaultStrokeStyle;
    context.lineWidth = this.defaultLineWidth;
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.stroke();
    context.lineTo(points[2].x, points[2].y);
    context.stroke();
    context.lineTo(points[3].x, points[3].y);
    context.stroke();
    context.lineTo(points[0].x, points[0].y);
    context.stroke();
  }

  visualizeFreeCurve(annotation: ResearchAnnotation, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const points = annotation.points.map(point => {
      return { x: point.x * canvas.width, y: point.y * canvas.height };
    });
    context.beginPath();
    context.strokeStyle = this.defaultStrokeStyle;
    context.lineWidth = this.defaultLineWidth;
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
    }
    context.lineTo(points[0].x, points[0].y);
    context.stroke();
  }

}
