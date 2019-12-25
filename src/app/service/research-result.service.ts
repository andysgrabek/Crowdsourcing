import { Injectable } from '@angular/core';
import ResearchResult from '../dto/ResearchResult';
import {TranslationBundle, TranslationService} from './translation.service';
import {ProgressService} from './progress.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from './user.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchResultService {

  private rb: TranslationBundle;

  constructor(private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private db: AngularFireDatabase,
              private userService: UserService,
              private tr: TranslationService) {
    this.rb = tr.getServiceBundle('ResearchResultService');
  }

  getAllResultsById(researchId: string): Observable<Map<string, ResearchResult>> {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/results/' + researchId;
    const observable = this.db.object(accessPath).valueChanges() as Observable<Map<string, ResearchResult>>;
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  getSingleResultById(researchId: string, resultId: string): Observable<ResearchResult> {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/results/' + researchId + '/' + resultId;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchResult>;
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  async submitResearchResult(researchId: string, userId: string, result: ResearchResult) {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + userId + '/results/' + researchId;
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    try {
      await this.db.database.ref(accessPath).push().set(result);
      this.snackBar.open(this.rb.get('submit-success'), undefined, config);
    } catch (e) {
      this.snackBar.open(this.rb.get('submit-fail'), undefined, config);
    } finally {
      this.progressService.setLoadingState(false);
    }
  }

}
