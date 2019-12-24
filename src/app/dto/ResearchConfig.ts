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
    this.consents = [];
    this.tutorials = [];
    this.surveys = [];
    this.steps = [];
  }

}
