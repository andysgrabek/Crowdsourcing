import {Component, Input, OnInit} from '@angular/core';
import ResearchSurvey, {ResearchSurveyType} from '../dto/ResearchSurvey';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research-survey',
  templateUrl: './research-survey.component.html',
  styleUrls: ['./research-survey.component.css']
})
export class ResearchSurveyComponent implements OnInit {

  @Input()
  survey: ResearchSurvey;
  rb: TranslationBundle;
  researchSurveyTypes = ResearchSurveyType;
  textAnswer = '';
  radioAnswer = '';
  checkboxAnswers: string[] = [];

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchSurveyComponent');
  }

  ngOnInit() {

  }

  getAnswer(): string[] {
    switch (this.survey.type) {
      case ResearchSurveyType.TEXT:
        return [this.textAnswer];
      case ResearchSurveyType.RADIO:
        return [this.radioAnswer];
      case ResearchSurveyType.CHECKBOX:
        return this.checkboxAnswers;
    }
  }

  isValid(): boolean {
    switch (this.survey.type) {
      case ResearchSurveyType.TEXT:
        return !!this.textAnswer;
      case ResearchSurveyType.RADIO:
        return !!this.radioAnswer;
      case ResearchSurveyType.CHECKBOX:
        return this.checkboxAnswers && this.checkboxAnswers.length > 0;
    }
  }
}
