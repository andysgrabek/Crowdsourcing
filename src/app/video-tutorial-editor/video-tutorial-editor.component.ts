import { Component, OnInit } from '@angular/core';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-tutorial-editor',
  templateUrl: './video-tutorial-editor.component.html',
  styleUrls: ['./video-tutorial-editor.component.css']
})
export class VideoTutorialEditorComponent extends AbstractTutorialEditor implements OnInit {

  ytUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.sanitizeYouTubeUrl();
  }

  onUrlChange(value: string) {
    super.onUrlChange(value);
    this.sanitizeYouTubeUrl();
  }

  private sanitizeYouTubeUrl() {
    // TODO allow non-embeddable urls from user input
    this.ytUrl = this.tutorial.url ? this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.url) : '';
  }

}
