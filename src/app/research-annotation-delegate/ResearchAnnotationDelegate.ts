export interface ResearchAnnotationDelegate {

  start(point: {x: number, y: number}): void;
  move(point: {x: number, y: number}, event?: MouseEvent): void;
  end(point: {x: number, y: number}): {x: number, y: number}[];

}
