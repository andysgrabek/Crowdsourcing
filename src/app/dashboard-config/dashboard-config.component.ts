import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-dashboard-config',
  templateUrl: './dashboard-config.component.html',
  styleUrls: ['./dashboard-config.component.css']
})
export class DashboardConfigComponent implements OnInit {

  @Input()
  model: firebase.User;
  rb: TranslationBundle;

  constructor(public userService: UserService, private tr: TranslationService) {
    this.rb = this.tr.getComponentBundle('DashboardConfigComponent');
  }

  ngOnInit() {
  }

}
