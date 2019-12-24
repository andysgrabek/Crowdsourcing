export default class ResearchTutorial {
  name: string;
  text: string;
  type: ResearchTutorialType;
  url: string;

  constructor(name?: string, text?: string, type?: ResearchTutorialType, url?: string) {
    this.name = name || '';
    this.text = text || '';
    this.type = type || ResearchTutorialType.TEXT;
    this.url = url || '';
  }
}

export enum ResearchTutorialType {
  TEXT,
  IMAGE,
  VIDEO
}
