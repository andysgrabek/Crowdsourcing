import ResearchConsent from './ResearchConsent';
import ResearchTutorial from './ResearchTutorial';
import ResearchSurvey from './ResearchSurvey';
import ResearchStep from './ResearchStep';

export class ResearchConfig {
  id: string;
  userId: string;
  isLive: boolean;
  consents: ResearchConsent[];
  tutorials: ResearchTutorial[];
  surveys: ResearchSurvey[];
  steps: ResearchStep[];

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
        'https://www.youtube.com/embed/odWxQ5eEnfE'),
      new ResearchTutorial(
        'text tutorial',
        'text description',
        'text'),
    ];
    this.surveys = [
      new ResearchSurvey('radio question', 'question text', 'radio', [{val: 'yes'}, {val: 'no'}]),
      new ResearchSurvey('checkbox question', 'question text', 'checkbox', [{val: 'a'}, {val: 'a'}, {val: 'a'}]),
    ];
    this.steps = [
      new ResearchStep(),
      new ResearchStep()
    ];
  }

}
