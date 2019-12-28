export default class ResearchResult {

  submitDate: number;
  consents: boolean[]; // array of booleans to represent if a given consent was given
  answers: string[][]; // even a yes/no question returns an array, but with 1 element
  data: {k: string, v: object | number | string}[][];

  constructor(consents: boolean[], answers: string[][], data: {k: string, v: object | number | string}[][]) {
    this.consents = consents;
    this.answers = answers;
    this.submitDate = Date.now();
    this.data = data;
  }

}
