import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ProgressService} from './progress.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {TranslationBundle, TranslationService} from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rb: TranslationBundle;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private progressService: ProgressService,
              private snackBar: MatSnackBar,
              private tr: TranslationService) {
    this.rb = tr.getServiceBundle('UserService');
  }

  async login(credentials: { email: string, password: string}) {
    this.progressService.setLoadingState(true);
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      await this.router.navigateByUrl('dashboard');
      this.snackBar.open(this.rb.get('login-success'), undefined, config);
    } catch {
      this.snackBar.open(this.rb.get('login-fail'), undefined, config);
    }
    this.progressService.setLoadingState(false);
    return this.afAuth.user;
  }

  async logout() {
    this.progressService.setLoadingState(true);
    await this.afAuth.auth.signOut();
    await this.router.navigateByUrl('');
    this.progressService.setLoadingState(false);
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  async beginChangePassword() {
    this.progressService.setLoadingState(true);
    const actionCodeSettings = {
      url: 'http://' + window.location.host + '/',
      handleCodeInApp: false
    };
    await this.afAuth.auth.sendPasswordResetEmail(this.afAuth.auth.currentUser.email, actionCodeSettings);
    this.progressService.setLoadingState(false);
  }

  async beginRegisterUser(credentials: { email: string, password: string}) {
    this.progressService.setLoadingState(true);
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
      if (!res.user.emailVerified) {
        const actionCodeSettings = {
          url: 'http://' + window.location.host + '/',
          handleCodeInApp: false
        };
        await res.user.sendEmailVerification(actionCodeSettings);
      }
    } catch (err) {
      console.log(err);
    }
    this.progressService.setLoadingState(false);
  }

}
