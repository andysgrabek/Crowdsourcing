import { Component, OnInit } from '@angular/core';
import {AbstractSurveyEditor} from '../abstract-survey-editor/abstract-survey-editor';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-text-survey-editor',
  templateUrl: './text-survey-editor.component.html',
  styleUrls: ['./text-survey-editor.component.css']
})
export class TextSurveyEditorComponent extends AbstractSurveyEditor implements OnInit {

  rb: TranslationBundle;
  constructor(private tr: TranslationService) {
    super();
    this.rb = tr.getComponentBundle('TextSurveyEditorComponent');
  }

  ngOnInit() {
  }

}
