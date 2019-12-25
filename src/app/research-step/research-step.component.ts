import {Component, Input, OnInit} from '@angular/core';
import ResearchStep from '../dto/ResearchStep';

@Component({
  selector: 'app-research-step',
  templateUrl: './research-step.component.html',
  styleUrls: ['./research-step.component.css']
})
export class ResearchStepComponent implements OnInit {

  @Input()
  model: ResearchStep;

  constructor() { }

  ngOnInit() {
  }

}
