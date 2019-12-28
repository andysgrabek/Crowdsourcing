export interface ResearchAnnotationDelegate {

  start(point: {x: number, y: number}): void;
  move(point: {x: number, y: number}): void;
  end(point: {x: number, y: number}): {x: number, y: number}[];

}
