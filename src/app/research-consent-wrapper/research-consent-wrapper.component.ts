import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';
import {ResearchConsentComponent} from '../research-consent/research-consent.component';

@Component({
  selector: 'app-research-consent-wrapper',
  templateUrl: './research-consent-wrapper.component.html',
  styleUrls: ['./research-consent-wrapper.component.css']
})
export class ResearchConsentWrapperComponent implements OnInit {

  @ViewChildren(ResearchConsentComponent)
  viewChildren !: QueryList<ResearchConsentComponent>;
  @Input()
  model: ResearchConsent[];

  constructor() {

  }

  ngOnInit() {

  }

  getResearchConsents(): boolean[] {
    return this.viewChildren.map(consentComponent => consentComponent.isMarked());
  }

  didMarkAllRequiredConsents(): boolean {
    return this.viewChildren.map(consentComponent => consentComponent.isValid()).reduce((a, b) => a && b, true);
  }

}
