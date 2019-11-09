import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule, MatFormFieldModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSnackBar, MatSnackBarModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {appRoutingModule} from './app.router';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResearchConfigComponent } from './research-config/research-config.component';
import { ResearchConfigConsentComponent } from './research-config-consent/research-config-consent.component';
import { ResearchConfigTutorialComponent } from './research-config-tutorial/research-config-tutorial.component';
import { ResearchConfigStepsComponent } from './research-config-steps/research-config-steps.component';
import { ResearchDataComponent } from './research-data/research-data.component';
import { ResearchConsentComponent } from './research-consent/research-consent.component';
import { ResearchTutorialComponent } from './research-tutorial/research-tutorial.component';
import { ResearchStepComponent } from './research-step/research-step.component';
import { ResearchComponent } from './research/research.component';
import { ResearchSurveyComponent } from './research-survey/research-survey.component';
import { DashboardConfigComponent } from './dashboard-config/dashboard-config.component';
import { ResearchConfigListComponent } from './research-config-list/research-config-list.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import { RegisterComponent } from './register/register.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ResearchConfigSurveyComponent } from './research-config-survey/research-config-survey.component';
import { ConsentEditDialogComponent } from './consent-edit-dialog/consent-edit-dialog.component';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {CookieService} from 'ngx-cookie-service';
import { TextTutorialEditorComponent } from './text-tutorial-editor/text-tutorial-editor.component';
import { ImageTutorialEditorComponent } from './image-tutorial-editor/image-tutorial-editor.component';
import { VideoTutorialEditorComponent } from './video-tutorial-editor/video-tutorial-editor.component';
import { TextSurveyEditorComponent } from './text-survey-editor/text-survey-editor.component';
import { MultipleChoiceSurveyEditorComponent } from './multiple-choice-survey-editor/multiple-choice-survey-editor.component';

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
    LoginComponent,
    DashboardComponent,
    ResearchConfigComponent,
    ResearchConfigConsentComponent,
    ResearchConfigTutorialComponent,
    ResearchConfigStepsComponent,
    ResearchDataComponent,
    ResearchConsentComponent,
    ResearchTutorialComponent,
    ResearchStepComponent,
    ResearchComponent,
    ResearchSurveyComponent,
    DashboardConfigComponent,
    ResearchConfigListComponent,
    RegisterComponent,
    ConfirmDialogComponent,
    ResearchConfigSurveyComponent,
    ConsentEditDialogComponent,
    TextTutorialEditorComponent,
    ImageTutorialEditorComponent,
    VideoTutorialEditorComponent,
    TextSurveyEditorComponent,
    MultipleChoiceSurveyEditorComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [
    AngularFireAuthGuard,
    AngularFireDatabase,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ConsentEditDialogComponent,
    TextTutorialEditorComponent,
    ImageTutorialEditorComponent,
    VideoTutorialEditorComponent,
    TextSurveyEditorComponent,
    MultipleChoiceSurveyEditorComponent
  ]
})
export class AppModule {

  constructor() {

  }


}
