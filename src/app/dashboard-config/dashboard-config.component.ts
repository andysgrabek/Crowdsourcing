import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard-config',
  templateUrl: './dashboard-config.component.html',
  styleUrls: ['./dashboard-config.component.css']
})
export class DashboardConfigComponent implements OnInit {

  @Input()
  private model: firebase.User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
