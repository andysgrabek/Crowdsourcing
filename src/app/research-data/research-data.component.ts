import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ResearchResultService} from '../service/research-result.service';
import {ActivatedRoute} from '@angular/router';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {AngularFireFunctions} from '@angular/fire/functions';

@Component({
  selector: 'app-research-data',
  templateUrl: './research-data.component.html',
  styleUrls: ['./research-data.component.css']
})
export class ResearchDataComponent implements OnInit {

  researchData: Observable<any>;
  private id: string;
  rb: TranslationBundle;

  constructor(private resultService: ResearchResultService,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchDataComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchData = this.resultService.getAllResultsById(this.id);
    // const list = this.fireFunctions.functions;
    // console.log(list);
  }

}
