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
    // TODO see https://stackoverflow.com/questions/43897180/how-can-i-get-a-youtube-video-id-from-the-youtube-api-given-the-video-url?rq=1
    // TODO after extracting video ID from google API, compose the embedable url to be used for preview
    this.ytUrl = this.tutorial.url ? this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.url) : '';
  }

}
