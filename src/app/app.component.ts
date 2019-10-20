import { Component } from '@angular/core';
import {UserService} from './service/user.service';
import {ProgressService} from './service/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CrowdSourcing';

  constructor(public userService: UserService, public progressService: ProgressService) {

  }

  async logout() {
    await this.userService.logout();
  }

}
