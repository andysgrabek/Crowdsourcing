import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-config',
  templateUrl: './dashboard-config.component.html',
  styleUrls: ['./dashboard-config.component.css']
})
export class DashboardConfigComponent implements OnInit {

  @Input()
  model: firebase.User;
  rb: TranslationBundle;

  constructor(private userService: UserService,
              private tr: TranslationService,
              private matSnackBar: MatSnackBar) {
    this.rb = this.tr.getComponentBundle('DashboardConfigComponent');
  }

  ngOnInit() {
  }

  async onChangePassword() {
    try {
      await this.userService.beginChangePassword();
      this.matSnackBar.open(this.rb.get('reset-success'), undefined, {duration: 3000});
    } catch (e) {
      this.matSnackBar.open(this.rb.get('reset-failure'), undefined, {duration: 3000});
    }
  }
}
