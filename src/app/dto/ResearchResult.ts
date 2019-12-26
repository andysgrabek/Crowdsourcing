export default class ResearchResult {

  submitDate: Date;
  consents: boolean[]; // array of booleans to represent if a given consent was given
  answers: string[][]; // even a yes/no question returns an array, but with 1 element
  data: Map<string, object | number>[]; // 'any' represents the object containing the data collected for the given question.

  constructor(consents: boolean[], answers: string[][], data: Map<string, object | number>[]) {
    this.consents = consents;
    this.answers = answers;
    this.submitDate = new Date();
    this.data = data;
  }

}
