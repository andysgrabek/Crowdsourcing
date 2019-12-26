import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import ResearchSurvey from '../dto/ResearchSurvey';
import {ResearchSurveyComponent} from '../research-survey/research-survey.component';

@Component({
  selector: 'app-research-survey-wrapper',
  templateUrl: './research-survey-wrapper.component.html',
  styleUrls: ['./research-survey-wrapper.component.css']
})
export class ResearchSurveyWrapperComponent implements OnInit {

  @ViewChildren(ResearchSurveyComponent)
  viewChildren !: QueryList<ResearchSurveyComponent>;
  @Input()
  model: ResearchSurvey[];

  constructor() { }

  ngOnInit() {
  }

  getResearchSurveyAnswers(): string[][] {
    // todo implement me
    return [ ['works1'], ['works2']];
  }

  didProvideValidAnswers() {
    return this.viewChildren.map(consentComponent => consentComponent.isValid()).reduce((a, b) => a && b, true);
  }
}
