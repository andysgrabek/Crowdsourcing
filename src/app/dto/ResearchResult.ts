export default class ResearchResult {

  creationDate: Date;
  consents: boolean[]; // array of booleans to represent if a given consent was given
  answers: string[][]; // even a yes/no question returns an array, but with 1 element
  data: object[]; // 'any' represents the object containing the data collected for the given question.

  constructor(consents: boolean[], answers: string[][], data: object[]) {
    this.consents = consents;
    this.answers = answers;
    this.creationDate = new Date();
    this.data = data;
  }

}
