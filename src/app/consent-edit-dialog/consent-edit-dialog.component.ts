import { Component, OnInit } from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';

@Component({
  selector: 'app-consent-edit-dialog',
  templateUrl: './consent-edit-dialog.component.html',
  styleUrls: ['./consent-edit-dialog.component.css']
})
export class ConsentEditDialogComponent implements OnInit {
  consent: ResearchConsent;
  showCancel = true;
  showConfirm = true;
  onConfirm: (newConsent: ResearchConsent) => void = () => {};
  onCancel: () => void = () => {};

  constructor() { }

  ngOnInit() {

  }

  onToggleMandatoryStatus() {
    this.consent.mandatory = !this.consent.mandatory;
  }

  onTextChange(value: string) {
    this.consent.text = value;
  }
}
