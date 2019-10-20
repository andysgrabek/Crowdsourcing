import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatButtonToggleModule, MatToolbarModule} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {appRoutingModule} from './app.router';
import {FormsModule} from '@angular/forms';

const firebaseConfig = {
  apiKey: 'AIzaSyDCS3sTMmqiPP64asRfKh4lo0hFUvjb5v4',
  authDomain: 'crowdsourcing-ceb7b.firebaseapp.com',
  databaseURL: 'https://crowdsourcing-ceb7b.firebaseio.com',
  projectId: 'crowdsourcing-ceb7b',
  storageBucket: 'crowdsourcing-ceb7b.appspot.com',
  messagingSenderId: '1065230394566',
  appId: '1:1065230394566:web:62df57c2a70cab29dfa3c7',
  measurementId: 'G-4KK9LTZ7MB'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

  }


}
