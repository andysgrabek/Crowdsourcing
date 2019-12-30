import { Component, OnInit } from '@angular/core';
import {AbstractSurveyEditor} from '../abstract-survey-editor/abstract-survey-editor';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-multiple-choice-survey-editor',
  templateUrl: './multiple-choice-survey-editor.component.html',
  styleUrls: ['./multiple-choice-survey-editor.component.css']
})
export class MultipleChoiceSurveyEditorComponent extends AbstractSurveyEditor implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    super();
    this.rb = tr.getComponentBundle('MultipleChoiceSurveyEditorComponent');
  }

  ngOnInit() {
  }

  onRemoveAnswer(ans: { val: string }) {
    this.survey.answers = this.survey.answers.filter(a => a !== ans);
  }
}
