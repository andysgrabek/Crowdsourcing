import { Component, OnInit } from '@angular/core';
import {AbstractStepEditor} from '../abstract-step-editor/abstract-step-editor';

@Component({
  selector: 'app-image-step-editor',
  templateUrl: './image-step-editor.component.html',
  styleUrls: ['./image-step-editor.component.css']
})
export class ImageStepEditorComponent extends AbstractStepEditor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
