import {Component, Input, OnInit} from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research-consent',
  templateUrl: './research-consent.component.html',
  styleUrls: ['./research-consent.component.css']
})
export class ResearchConsentComponent implements OnInit {

  @Input()
  consent: ResearchConsent;
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = this.tr.getComponentBundle('ResearchConsentComponent');
  }

  ngOnInit() {
  }

}
