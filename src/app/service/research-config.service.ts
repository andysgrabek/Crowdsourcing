import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from './progress.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {

  constructor(private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private db: AngularFireDatabase,
              private userService: UserService) { }

  getAll(): Observable<Map<string, ResearchConfig>> {
    this.progressService.loading = true;
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research';
    const observable = this.db.object(accessPath).valueChanges().pipe(map(obj => new Map(Object.entries(obj))));
    this.progressService.loading = false;
    return observable;
  }

  getById(id: string): Observable<ResearchConfig> {
    this.progressService.loading = true;
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research/' + id;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchConfig>;
    this.progressService.loading = false;
    return observable;
  }

  getByIdUnauthenticated(userId: string, researchId: string) {
    this.progressService.loading = true;
    const accessPath = 'users/' + userId + '/research/' + researchId;
    const observable = this.db.object(accessPath).valueChanges() as Observable<ResearchConfig>;
    this.progressService.loading = false;
    return observable;
  }

  setResearchLive(id: string, research: ResearchConfig, isLive: boolean): boolean {
    this.progressService.loading = true;
    research.isLive = isLive;
    this.handleUpdate(id, research);
    this.progressService.loading = false;
    return true;
  }

  async createResearch() {
    const research = new ResearchConfig();
    const accessPath = 'users/' + this.userService.getCurrentUser().uid + '/research';
    const ref = this.db.database.ref(accessPath);
    const result = await ref.push().set(research);
  }

  deleteResearch(id: string): boolean {
    this.progressService.loading = true;
    console.log('Implement me! (delete research)');
    this.handleDelete();
    this.progressService.loading = false;
    return true;
  }

  updateResearch(id: string, researchConfig: ResearchConfig): boolean {
    this.progressService.loading = true;
    this.handleUpdate(id, researchConfig);
    this.progressService.loading = false;
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
