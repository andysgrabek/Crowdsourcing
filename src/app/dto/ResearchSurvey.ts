export default class ResearchSurvey {
  name: string;
  text: string;
  type: string;
  answers: {val: string}[];

  constructor(name?: string, text?: string, type?: string, answers?: {val: string}[]) {
    this.name = name ? name : 'question name';
    this.text = text ? text : 'question text';
    this.type = type ? type : 'radio';
    this.answers = answers ? answers : [{val: 'answer 1'}, {val: 'answer 2'}];
  }

}
