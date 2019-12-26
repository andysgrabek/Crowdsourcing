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

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchSurveyComponent');
  }

  ngOnInit() {

  }

  isValid(): boolean {
    return true;
  }
}
