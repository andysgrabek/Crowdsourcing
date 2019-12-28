export default class ResearchAnnotation {

  type: ResearchAnnotationType;
  comment: string;
  points: {x: number, y: number}[];

  constructor(type?: ResearchAnnotationType, comment?: string, points?: {x: number, y: number}[]) {
    this.type = type;
    this.comment = comment;
    this.points = points;
  }

}

export enum ResearchAnnotationType {
  RECTANGLE,
  CIRCLE,
  FREE_CURVE
}
