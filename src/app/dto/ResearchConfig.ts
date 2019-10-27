import {ResearchConsent} from './ResearchConsent';

export class ResearchConfig {
  id: string;
  userId: string;
  isLive: boolean;
  consents: ResearchConsent[];

  constructor() {
    this.isLive = false;
    this.id = 'idXD';
    this.userId = 'userIdXD';
    this.consents = [ new ResearchConsent() ];
  }

}
