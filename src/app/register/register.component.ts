import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: {email: string, password: string} = {email: '', password: ''};

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async onSubmit() {
    await this.userService.beginRegisterUser(this.model);
  }
}
