export default class ResearchStep {
  name: string;
  text: string;
  type: string;
  url: string;

  constructor(name?: string, text?: string, type?: string, url?: string) {
    this.name = name ? name : 'step name';
    this.text = text ? text : 'step description';
    this.type = type ? type : 'text';
    this.url = url ? url : 'url';
  }

}
