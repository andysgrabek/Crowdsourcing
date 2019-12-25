import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: {email: string, password: string} = {email: '', password: ''};
  rb: TranslationBundle;

  constructor(private userService: UserService, private tr: TranslationService) {
    this.rb = tr.getComponentBundle('RegisterComponent');
  }

  ngOnInit() {
  }

  async onSubmit() {
    await this.userService.beginRegisterUser(this.model);
  }
}
