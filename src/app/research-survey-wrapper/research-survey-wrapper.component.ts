import {Component, Input, OnInit} from '@angular/core';
import ResearchSurvey from '../dto/ResearchSurvey';

@Component({
  selector: 'app-research-survey-wrapper',
  templateUrl: './research-survey-wrapper.component.html',
  styleUrls: ['./research-survey-wrapper.component.css']
})
export class ResearchSurveyWrapperComponent implements OnInit {

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
    // todo implement me
    return true;
  }
}
