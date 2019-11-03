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
    this.progressService.loading = true;
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      await this.router.navigateByUrl('dashboard');
    } catch (e) {
      console.log('Error logging in user with email: ' + credentials.email);
    }
    this.progressService.loading = false;
    return this.afAuth.user;
  }

  async logout() {
    this.progressService.loading = true;
    await this.afAuth.auth.signOut();
    await this.router.navigateByUrl('');
    this.progressService.loading = false;
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  async beginChangePassword() {
    this.progressService.loading = true;
    const actionCodeSettings = {
      url: 'http://' + window.location.host + '/',
      handleCodeInApp: false
    };
    await this.afAuth.auth.sendPasswordResetEmail(this.afAuth.auth.currentUser.email, actionCodeSettings);
    this.progressService.loading = false;
  }

  async beginRegisterUser(credentials: { email: string, password: string}) {
    this.progressService.loading = true;
    await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    this.progressService.loading = false;
  }

}
