import { Component, OnInit } from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-consent-edit-dialog',
  templateUrl: './consent-edit-dialog.component.html',
  styleUrls: ['./consent-edit-dialog.component.css']
})
export class ConsentEditDialogComponent implements OnInit {
  consent: ResearchConsent;
  showCancel = true;
  showConfirm = true;
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = this.tr.getComponentBundle('ConsentEditDialogComponent');
  }

  ngOnInit() {

  }

  onConfirm: (newConsent: ResearchConsent) => void = () => {};

  onCancel: () => void = () => {};

  onToggleMandatoryStatus() {
    this.consent.mandatory = !this.consent.mandatory;
  }

  onTextChange(value: string) {
    this.consent.text = value;
  }
}
