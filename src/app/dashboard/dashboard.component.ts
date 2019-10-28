import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {ResearchConfigService} from '../service/research-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public userService: UserService, public researchConfigService: ResearchConfigService) { }

  ngOnInit() {

  }

}