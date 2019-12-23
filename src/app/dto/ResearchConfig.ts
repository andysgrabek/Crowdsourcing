import ResearchConsent from './ResearchConsent';
import ResearchTutorial from './ResearchTutorial';
import ResearchSurvey from './ResearchSurvey';
import ResearchStep from './ResearchStep';

export class ResearchConfig {
  isLive: boolean;
  consents: ResearchConsent[];
  tutorials: ResearchTutorial[];
  surveys: ResearchSurvey[];
  steps: ResearchStep[];

  constructor() {
    this.isLive = false;
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
        'text',
         null),
    ];
    this.surveys = [
      new ResearchSurvey('radio question', 'question text', 'radio', [{val: 'yes'}, {val: 'no'}]),
      new ResearchSurvey('checkbox question', 'question text', 'checkbox', [{val: 'a'}, {val: 'a'}, {val: 'a'}]),
    ];
    this.steps = [
      new ResearchStep('video step',
        'this is a video step do as I say',
        'video',
        'https://www.youtube.com/embed/odWxQ5eEnfE'),
      new ResearchStep('image step',
        'this is an image step do as I say',
        'image',
        'https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/education_24.jpg?itok=v4vx6ron')
    ];
  }

}
