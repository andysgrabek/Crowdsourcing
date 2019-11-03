import ResearchConsent from './ResearchConsent';
import ResearchTutorial from './ResearchTutorial';

export class ResearchConfig {
  id: string;
  userId: string;
  isLive: boolean;
  consents: ResearchConsent[];
  tutorials: ResearchTutorial[];

  constructor() {
    this.isLive = false;
    this.id = 'idXD';
    this.userId = 'userIdXD';
    this.consents = [ new ResearchConsent() ];
    this.tutorials = [
      new ResearchTutorial(
        'image tutorial',
        'image description',
        'image',
        'https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/education_24.jpg?itok=v4vx6ron'),
      new ResearchTutorial(
        'video tutorial',
        'video description',
        'video',
        'https://www.youtube.com/watch?v=M1BEfcXBNLI'),
      new ResearchTutorial(
        'text tutorial',
        'text description',
        'text'),


    ];
  }

}
