import { Component, OnInit } from '@angular/core';
import {AbstractStepEditor} from '../abstract-step-editor/abstract-step-editor';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-video-step-editor',
  templateUrl: './video-step-editor.component.html',
  styleUrls: ['./video-step-editor.component.css']
})
export class VideoStepEditorComponent extends AbstractStepEditor implements OnInit {

  ytUrl: SafeResourceUrl;
  rb: TranslationBundle;

  constructor(private sanitizer: DomSanitizer, private tr: TranslationService) {
    super();
    this.rb = tr.getComponentBundle('VideoStepEditorComponent');
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
    // TODO see https://stackoverflow.com/questions/43897180/how-can-i-get-a-youtube-video-id-from-the-youtube-api-given-the-video-url?rq=1
    // TODO after extracting video ID from google API, compose the embedable url to be used for preview
    this.ytUrl = this.step.url ? this.sanitizer.bypassSecurityTrustResourceUrl(this.step.url) : '';
  }

}
