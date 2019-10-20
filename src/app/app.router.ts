import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ResearchConfigComponent} from './research-config/research-config.component';
import {ResearchConfigConsentComponent} from './research-config-consent/research-config-consent.component';
import {ResearchDataComponent} from './research-data/research-data.component';
import {ResearchSurveyConfigComponent} from './research-survey-config/research-survey-config.component';
import {ResearchConfigTutorialComponent} from './research-config-tutorial/research-config-tutorial.component';
import {ResearchConfigStepsComponent} from './research-config-steps/research-config-steps.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import {ResearchComponent} from './research/research.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-config', component: ResearchConfigComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-config-consent', component: ResearchConfigConsentComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-config-survey', component: ResearchSurveyConfigComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-config-tutorial', component: ResearchConfigTutorialComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-config-steps', component: ResearchConfigStepsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'research-data', component: ResearchDataComponent, canActivate: [AngularFireAuthGuard] },

  { path: 'research', component: ResearchComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
