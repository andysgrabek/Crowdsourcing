import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-share-research-dialog',
  templateUrl: './share-research-dialog.component.html',
  styleUrls: ['./share-research-dialog.component.css']
})
export class ShareResearchDialogComponent implements OnInit {
  researchId = '';
  userId = '';
  rb: TranslationBundle;

  constructor(private tr: TranslationService, private platformLocation: PlatformLocation) {
    this.rb = tr.getComponentBundle('ShareResearchDialogComponent');
  }

  ngOnInit() {
  }

  researchLink(): string {
    const baseUrl = `${window.location.origin}${this.platformLocation.getBaseHrefFromDOM()}`;
    return `${baseUrl}research/${this.userId}/${this.researchId}`;
  }
}
