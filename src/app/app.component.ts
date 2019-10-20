import { Component } from '@angular/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title = 'CrowdSourcing';

  constructor(private userService: UserService) {

  }

  async logout() {
    await this.userService.logout();
  }


}
