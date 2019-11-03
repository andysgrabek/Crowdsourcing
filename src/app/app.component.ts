import {Component} from '@angular/core';
import {UserService} from './service/user.service';
import {ProgressService} from './service/progress.service';
import {TranslationBundle, TranslationService} from './service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  rb: TranslationBundle;

  constructor(public userService: UserService, public progressService: ProgressService, private tr: TranslationService) {
    this.rb = this.tr.getBundle('component/app');
  }

  async logout() {
    await this.userService.logout();
  }

}
