import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ProgressService} from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private progressService: ProgressService) { }

  async login(credentials: { email: string, password: string}) {
    this.progressService.setLoadingState(true);
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      await this.router.navigateByUrl('dashboard');
    } catch (e) {
      console.log('Error logging in user with email: ' + credentials.email);
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
