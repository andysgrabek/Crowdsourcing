import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from './progress.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {map, tap} from 'rxjs/operators';
import {TranslationBundle, TranslationService} from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {
  private rb: TranslationBundle;

  constructor(private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private db: AngularFireDatabase,
              private userService: UserService,
              private tr: TranslationService) {
    this.rb = tr.getServiceBundle('ResearchConfigService');
  }

  getAll(): Observable<Map<string, ResearchConfig>> {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research';
    const observable = this.db.object(accessPath).valueChanges().pipe(map(obj => new Map(Object.entries(obj))));
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  getById(id: string): Observable<ResearchConfig> {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/' + id;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchConfig>;
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  getByIdUnauthenticated(userId: string, researchId: string): Observable<ResearchConfig> {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + userId + '/research/' + researchId;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchConfig>;
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  async setResearchLive(id: string, research: ResearchConfig, isLive: boolean) {
    this.progressService.setLoadingState(true);
    research.isLive = isLive;
    await this.handleUpdate(id, research);
  }

  async createResearch(researchConfig: ResearchConfig) {
    this.progressService.setLoadingState(true);
    await this.handleCreate(researchConfig);
  }

  async deleteResearch(id: string) {
    this.progressService.setLoadingState(true);
    await this.handleDelete(id);
  }

  async updateResearch(id: string, researchConfig: ResearchConfig) {
    this.progressService.setLoadingState(true);
    await this.handleUpdate(id, researchConfig);
  }

  private async handleCreate(researchConfig: ResearchConfig) {
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/';
    try {
      await this.db.database.ref(accessPath).push().set(researchConfig);
      this.snackBar.open(this.rb.get('create-success'));
    } catch (e) {
      this.snackBar.open(this.rb.get('create-fail'));
    } finally {
      this.progressService.setLoadingState(false);
    }
  }

  private async handleUpdate(id: string, researchConfig: ResearchConfig) {
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/' + id;
    try {
      await this.db.database.ref(accessPath).update(researchConfig);
      this.snackBar.open(this.rb.get('update-success'));
    } catch (e) {
      this.snackBar.open(this.rb.get('update-fail'));
    } finally {
      this.progressService.setLoadingState(false);
    }
  }

  private async handleDelete(id: string) {
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/' + id;
    try {
      await this.db.database.ref(accessPath).remove();
      this.snackBar.open(this.rb.get('delete-success'));
    } catch (e) {
      this.snackBar.open(this.rb.get('delete-fail'));
    } finally {
      this.progressService.setLoadingState(false);
    }
  }

}
