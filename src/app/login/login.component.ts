import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: {email: string, password: string} = {email: '', password: ''};

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async onSubmit() {
    await this.userService.login(this.model);
  }
}
