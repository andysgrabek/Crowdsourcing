import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService, public userService: UserService) {
    this.rb = this.tr.getComponentBundle('HeaderComponent');
  }

  ngOnInit() {

  }

  async logout() {
    await this.userService.logout();
  }

}
