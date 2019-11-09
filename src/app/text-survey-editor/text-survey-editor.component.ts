import { Component, OnInit } from '@angular/core';
import {AbstractSurveyEditor} from '../abstract-survey-editor/abstract-survey-editor';

@Component({
  selector: 'app-text-survey-editor',
  templateUrl: './text-survey-editor.component.html',
  styleUrls: ['./text-survey-editor.component.css']
})
export class TextSurveyEditorComponent extends AbstractSurveyEditor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
