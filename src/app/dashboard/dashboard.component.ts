import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {ResearchConfigService} from '../service/research-config.service';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rb: TranslationBundle;

  constructor(public userService: UserService,
              public researchConfigService: ResearchConfigService,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('DashboardComponent');
  }

  ngOnInit() {

  }

}
