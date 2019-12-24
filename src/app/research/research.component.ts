import { Component, OnInit } from '@angular/core';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatStepper} from '@angular/material/stepper';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  public model: ResearchConfig;
  rb: TranslationBundle;
  stepTypes = ResearchStepperSteps;

  constructor(private researchConfigService: ResearchConfigService,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle(this);
  }

  ngOnInit() {
    this.researchConfigService.getByIdUnauthenticated(
        this.route.snapshot.paramMap.get('userId'),
        this.route.snapshot.paramMap.get('researchId')).subscribe(res => {
          this.model = res;
    });
  }

  async goBack(stepper: MatStepper) {
    stepper.previous();
  }

  async goForward(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case ResearchStepperSteps.CONSENTS:
        break;
      case ResearchStepperSteps.SURVEY:
        break;
      case ResearchStepperSteps.TUTORIAL:
        break;
      case ResearchStepperSteps.SUMMARY:
        break;
      case ResearchStepperSteps.STEPS:
    }
    stepper.next();
  }
}

export enum ResearchStepperSteps {
  CONSENTS,
  SURVEY,
  TUTORIAL,
  STEPS,
  SUMMARY
}
