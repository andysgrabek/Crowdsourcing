import { Component, OnInit } from '@angular/core';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  
  public model: ResearchConfig;

  constructor(private researchConfigService: ResearchConfigService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.researchConfigService.getByIdUnauthenticated(
        this.route.snapshot.paramMap.get('userId'),
        this.route.snapshot.paramMap.get('researchId')).subscribe(res => {
          this.model = res;
    });
  }

  async goBack(stepper: MatHorizontalStepper) {
    stepper.previous();
  }

  async goForward(stepper: MatHorizontalStepper) {
    stepper.next();
  }
}
