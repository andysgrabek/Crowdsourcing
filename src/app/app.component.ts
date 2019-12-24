import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {ProgressService} from './service/progress.service';
import {TranslationBundle, TranslationService} from './service/translation.service';
import {MatSelectChange} from '@angular/material';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rb: TranslationBundle;
  private cookiesAcceptedCookieName = 'cookiesAccepted';

  constructor(public userService: UserService,
              public progressService: ProgressService,
              public tr: TranslationService,
              public cookieService: CookieService,
              public snackBar: MatSnackBar) {
    this.rb = this.tr.getComponentBundle('AppComponent');
  }

  ngOnInit(): void {
    this.handleCookieAcceptanceStatus();
  }

  async logout() {
    await this.userService.logout();
  }

  async setLocale(locale: string) {
    this.tr.setLocale(locale);
    window.location.reload();
  }

  handleCookieAcceptanceStatus() {
    if (!this.cookieService.check(this.cookiesAcceptedCookieName)) {
      this.cookieService.set(this.cookiesAcceptedCookieName, 'false');
    }
    if (this.cookieService.get(this.cookiesAcceptedCookieName) === 'false') {
      const config = new MatSnackBarConfig<any>();
      config.duration = 0;
      const instance = this.snackBar.open('Site uses cookies for proper operation', 'Acknowledge', config);
      instance.onAction().subscribe(next => this.acceptCookies());
    }
  }

  async acceptCookies() {
    this.cookieService.delete(this.cookiesAcceptedCookieName);
    this.cookieService.set(this.cookiesAcceptedCookieName, 'true');
  }

}
