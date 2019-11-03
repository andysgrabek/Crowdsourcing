export default class ResearchTutorial {
  name: string;
  text: string;
  type: string;
  url: string;

  constructor(name?: string, text?: string, type?: string, url?: string) {
    this.name = name ? name : 'tutorial name';
    this.text = text ? text : 'tutorial description';
    this.type = type ? type : 'text';
    this.url = url;
  }

}
