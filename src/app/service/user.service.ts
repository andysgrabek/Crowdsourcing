import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: UserCredential;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async login(credentials: { email: string, password: string}) {
    this.currentUser = null;
    try {
      this.currentUser = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      await this.router.navigateByUrl('');
    } catch (e) {
      console.log('Error logging in user with email: ' + credentials.email);
    }
    return this.currentUser;
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.currentUser = null;
    await this.router.navigateByUrl('');
  }

}
