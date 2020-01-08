import {ResearchAnnotationType} from '../dto/ResearchAnnotation';
import {ResearchAnnotationDelegate} from './ResearchAnnotationDelegate';
import FreeCurveAnnotationDelegate from './FreeCurveAnnotationDelegate';
import CircleAnnotationDelegate from './CircleAnnotationDelegate';
import RectangleAnnotationDelegate from './RectangleAnnotationDelegate';
import EllipseAnnotationDelegate from './EllipseAnnotationDelegate';

export default class ResearchAnnotationDelegateFactory {

  private constructor() {
  }

  static createDelegate(type: ResearchAnnotationType, canvas: HTMLCanvasElement): ResearchAnnotationDelegate {
    switch (type) {
      case ResearchAnnotationType.RECTANGLE:
        return new RectangleAnnotationDelegate(canvas);
      case ResearchAnnotationType.CIRCLE:
        return new CircleAnnotationDelegate(canvas);
      case ResearchAnnotationType.FREE_CURVE:
        return new FreeCurveAnnotationDelegate(canvas);
      case ResearchAnnotationType.ELLIPSE:
        return new EllipseAnnotationDelegate(canvas);
    }
  }

}
