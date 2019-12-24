import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: {email: string, password: string} = {email: '', password: ''};
  rb: TranslationBundle;

  constructor(private userService: UserService, private tr: TranslationService) {
    this.rb = tr.getComponentBundle(this);
  }

  ngOnInit() {
  }

  async onSubmit() {
    await this.userService.login(this.model);
  }
}
