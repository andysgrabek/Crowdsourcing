import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import ResearchStep from '../dto/ResearchStep';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {ResearchStepComponent} from '../research-step/research-step.component';
import ResearchStepData from "../dto/ResearchStepData";

@Component({
  selector: 'app-research-step-wrapper',
  templateUrl: './research-step-wrapper.component.html',
  styleUrls: ['./research-step-wrapper.component.css']
})
export class ResearchStepWrapperComponent implements OnInit {

  @ViewChildren(ResearchStepComponent, undefined) researchStepComponentList: QueryList<ResearchStepComponent>;
  @Output()
  lastStepFinished = new EventEmitter();
  @Input()
  model: ResearchStep[];
  currentStep: ResearchStep;
  rb: TranslationBundle;
  finished = false;

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchStepWrapperComponent');
  }

  ngOnInit() {
    this.currentStep = this.model[0];
  }

  finishCurrentStep() {
    if (this.model.indexOf(this.currentStep) + 1 === this.model.length) {
      this.lastStepFinished.emit();
      this.finished = true;
    } else {
      this.currentStep = this.model[this.model.indexOf(this.currentStep) + 1];
    }
  }

  getResearchData(): ResearchStepData[] {
    return this.researchStepComponentList.map(component => component.getStepData());
  }

}
