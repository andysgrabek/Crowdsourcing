export default class ResearchSurvey {
  name: string;
  text: string;
  type: ResearchSurveyType;
  answers: {val: string}[];

  constructor(name?: string, text?: string, type?: ResearchSurveyType, answers?: {val: string}[]) {
    this.name = name || '';
    this.text = text || '';
    this.type = type || ResearchSurveyType.TEXT;
    this.answers = answers || [];
  }

}

export enum ResearchSurveyType {
  TEXT,
  RADIO,
  CHECKBOX
}
