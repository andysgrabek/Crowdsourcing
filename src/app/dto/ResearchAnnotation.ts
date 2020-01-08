export default class ResearchAnnotation {

  annotationType: ResearchAnnotationType;
  comment: string;
  points: {x: number, y: number}[];

  constructor(annotationType?: ResearchAnnotationType, comment?: string, points?: {x: number, y: number}[]) {
    this.annotationType = annotationType;
    this.comment = comment;
    this.points = points;
  }

}

export enum ResearchAnnotationType {
  RECTANGLE,
  CIRCLE,
  FREE_CURVE,
  ELLIPSE
}
