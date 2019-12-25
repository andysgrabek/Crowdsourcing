import {Component, Input, OnInit} from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';

@Component({
  selector: 'app-research-consent-wrapper',
  templateUrl: './research-consent-wrapper.component.html',
  styleUrls: ['./research-consent-wrapper.component.css']
})
export class ResearchConsentWrapperComponent implements OnInit {

  @Input()
  model: ResearchConsent[];

  constructor() {

  }

  ngOnInit() {

  }

  getResearchConsents(): number[] {
    // todo implement me
    return [0];
  }

  didMarkAllRequiredConsents(): boolean {
    // todo implement me
    return true;
  }

}
