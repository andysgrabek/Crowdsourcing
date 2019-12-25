export default class ResearchSurvey {
  name: string;
  text: string;
  type: ResearchSurveyType;
  answers: {val: string}[];
  mandatory: boolean;

  constructor(name?: string, mandatory?: boolean, text?: string, type?: ResearchSurveyType, answers?: {val: string}[]) {
    this.name = name || '';
    this.mandatory = mandatory || false;
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
