import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {

  constructor(private snackBar: MatSnackBar, private progressService: ProgressService) { }

  getAll(): [ResearchConfig] {
    this.progressService.loading = true;

    this.progressService.loading = false;
    return [ new ResearchConfig() ];
  }

  getByUserId(userId: string): [ResearchConfig] {
    this.progressService.loading = true;

    this.progressService.loading = false;
    return [ new ResearchConfig() ];
  }

  getById(id: string): ResearchConfig {
    this.progressService.loading = true;

    this.progressService.loading = false;
    return new ResearchConfig();
  }

  setResearchLive(id: string, isLive: boolean): boolean {
    this.progressService.loading = true;
    console.log('Implement me! (publish research)');
    this.handleUpdate();
    this.progressService.loading = false;
    return true;
  }

  deleteResearch(id: string): boolean {
    this.progressService.loading = true;
    console.log('Implement me! (delete research)');
    this.handleDelete();
    this.progressService.loading = false;
    return true;
  }

  updateResearch(researchConfig: ResearchConfig): boolean {
    this.progressService.loading = true;
    console.log('Implement me! (update research)');
    this.handleUpdate();
    this.progressService.loading = false;
    return true;
  }

  private handleUpdate() {
    if (true) {
      this.snackBar.open('Successfully updated research configuration');
    } else {
      this.snackBar.open('Failed to update research configuration');
    }
  }

  private handleDelete() {
    if (true) {
      this.snackBar.open('Successfully deleted research configuration');
    } else {
      this.snackBar.open('Failed to delete research configuration');
    }
  }

}
