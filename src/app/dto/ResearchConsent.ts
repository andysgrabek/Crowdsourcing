export default class ResearchConsent {

  text: string;
  mandatory: boolean;

  constructor(text?: string, mandatory?: boolean) {
    this.text = text || '';
    this.mandatory = mandatory || false;
  }
}
