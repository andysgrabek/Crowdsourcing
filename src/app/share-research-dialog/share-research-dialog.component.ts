import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-share-research-dialog',
  templateUrl: './share-research-dialog.component.html',
  styleUrls: ['./share-research-dialog.component.css']
})
export class ShareResearchDialogComponent implements OnInit {
  researchId = '';
  userId = '';
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ShareResearchDialogComponent');
  }

  ngOnInit() {
  }

  researchLink(): string {
    return `${window.location.origin}/research/${this.userId}/${this.researchId}`;

  }
}
