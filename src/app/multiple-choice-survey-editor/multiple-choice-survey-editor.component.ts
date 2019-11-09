import { Component, OnInit } from '@angular/core';
import {AbstractSurveyEditor} from '../abstract-survey-editor/abstract-survey-editor';

@Component({
  selector: 'app-multiple-choice-survey-editor',
  templateUrl: './multiple-choice-survey-editor.component.html',
  styleUrls: ['./multiple-choice-survey-editor.component.css']
})
export class MultipleChoiceSurveyEditorComponent extends AbstractSurveyEditor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
