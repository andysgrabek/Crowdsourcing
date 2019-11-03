import { Component, OnInit } from '@angular/core';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';

@Component({
  selector: 'app-video-tutorial-editor',
  templateUrl: './video-tutorial-editor.component.html',
  styleUrls: ['./video-tutorial-editor.component.css']
})
export class VideoTutorialEditorComponent extends AbstractTutorialEditor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
