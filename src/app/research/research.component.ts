import {Component, OnInit, ViewChild} from '@angular/core';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatStepper} from '@angular/material/stepper';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {ResearchResultService} from '../service/research-result.service';
import ResearchResult from '../dto/ResearchResult';
import {ResearchStepWrapperComponent} from '../research-step-wrapper/research-step-wrapper.component';
import {ResearchConsentWrapperComponent} from '../research-consent-wrapper/research-consent-wrapper.component';
import {ResearchSurveyWrapperComponent} from '../research-survey-wrapper/research-survey-wrapper.component';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  @ViewChild(ResearchStepWrapperComponent, undefined) researchStepWrapperComponent: ResearchStepWrapperComponent;
  @ViewChild(ResearchConsentWrapperComponent, undefined) researchConsentWrapperComponent: ResearchConsentWrapperComponent;
  @ViewChild(ResearchSurveyWrapperComponent, undefined) researchSurveyWrapperComponent: ResearchSurveyWrapperComponent;
  model: ResearchConfig;
  lastStepFinished = false;
  rb: TranslationBundle;
  stepTypes = ResearchStepperSteps;
  uploadStates = ResearchResultUploadStates;
  private userId: string;
  private researchId: string;
  currentUploadState = ResearchResultUploadStates.NOT_ATTEMPTED;
  private REDIRECT_TIMEOUT = 5000;

  constructor(private researchConfigService: ResearchConfigService,
              private route: ActivatedRoute,
              private tr: TranslationService,
              private researchResultService: ResearchResultService,
              private router: Router) {
    this.rb = tr.getComponentBundle('ResearchComponent');
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.researchId = this.route.snapshot.paramMap.get('researchId');
    this.researchConfigService.getByIdUnauthenticated(this.userId, this.researchId).subscribe(res => {
          this.model = res;
    });
  }

  async goForward(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case ResearchStepperSteps.CONSENTS:
        if (this.researchConsentWrapperComponent.didMarkAllRequiredConsents()) {
          stepper.selected.completed = true;
        }
        break;
      case ResearchStepperSteps.SURVEY:
        if (this.researchSurveyWrapperComponent.didProvideValidAnswers()) {
          stepper.selected.completed = true;
        }
        break;
      case ResearchStepperSteps.TUTORIAL:
        stepper.selected.completed = true;
        break;
      case ResearchStepperSteps.STEPS:
        stepper.selected.completed = this.lastStepFinished;
        break;
      case ResearchStepperSteps.SUMMARY:
        break;
    }
    stepper.next();
  }

  async onSubmitResult() {
    try {
      const result = new ResearchResult(
        this.researchConsentWrapperComponent.getResearchConsents(),
        this.researchSurveyWrapperComponent.getResearchSurveyAnswers(),
        this.researchStepWrapperComponent.getResearchData()
      );
      await this.researchResultService.submitResearchResult(this.researchId, this.userId, result);
      this.currentUploadState = ResearchResultUploadStates.SUCCESSFUL;
      setTimeout(() => this.router.navigateByUrl(''), this.REDIRECT_TIMEOUT);
    } catch {
      this.currentUploadState = ResearchResultUploadStates.FAILED;
    }
  }
}

export enum ResearchResultUploadStates {
  NOT_ATTEMPTED,
  SUCCESSFUL,
  FAILED
}

export enum ResearchStepperSteps {
  CONSENTS,
  SURVEY,
  TUTORIAL,
  STEPS,
  SUMMARY
}
