export default class ResearchStep {
  name: string;
  text: string;
  type: ResearchStepType;
  url: string;

  constructor(name?: string, text?: string, type?: ResearchStepType, url?: string) {
    this.name = name || '';
    this.text = text || '';
    this.type = type || ResearchStepType.IMAGE;
    this.url = url || '';
  }

}

export enum ResearchStepType {
  TEXT,
  IMAGE,
  VIDEO
}
