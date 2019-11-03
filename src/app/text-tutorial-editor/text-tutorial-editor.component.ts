import { Component, OnInit } from '@angular/core';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';

@Component({
  selector: 'app-text-tutorial-editor',
  templateUrl: './text-tutorial-editor.component.html',
  styleUrls: ['./text-tutorial-editor.component.css']
})
export class TextTutorialEditorComponent extends AbstractTutorialEditor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
