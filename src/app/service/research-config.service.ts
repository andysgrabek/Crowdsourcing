import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from './progress.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {

  constructor(private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private db: AngularFireDatabase,
              private userService: UserService) { }

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

  getByIdUnauthenticated(userId: string, researchId: string) {
    this.progressService.setLoadingState(true);
    const accessPath = 'users/' + userId + '/research/' + researchId;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchConfig>;
    return observable.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  setResearchLive(id: string, research: ResearchConfig, isLive: boolean): boolean {
    this.progressService.setLoadingState(true);
    research.isLive = isLive;
    this.handleUpdate(id, research);
    return true;
  }

  async createResearch() {
    const research = new ResearchConfig();
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research';
    const ref = this.db.database.ref(accessPath);
    const result = await ref.push().set(research);
  }

  deleteResearch(id: string): boolean {
    this.progressService.setLoadingState(true);
    console.log('Implement me! (delete research)');
    this.handleDelete();
    this.progressService.setLoadingState(false);
    return true;
  }

  updateResearch(id: string, researchConfig: ResearchConfig): boolean {
    this.progressService.setLoadingState(true);
    this.handleUpdate(id, researchConfig);
    return true;
  }

  private handleUpdate(id: string, researchConfig: ResearchConfig) {
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/' + id;
    this.db.database.ref(accessPath).update(researchConfig)
      .then(res => {
        this.snackBar.open('Successfully updated research configuration');
      })
      .catch(err => {
        this.snackBar.open('Failed to update research configuration');
      }).finally(() => {
        this.progressService.setLoadingState(false);
    });
  }

  private handleDelete() {
    if (true) {
      this.snackBar.open('Successfully deleted research configuration');
    } else {
      this.snackBar.open('Failed to delete research configuration');
    }
  }

}
