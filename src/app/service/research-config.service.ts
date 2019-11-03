import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {

  constructor(private snackBar: MatSnackBar) { }

  getAll(): [ResearchConfig] {
    return [ new ResearchConfig() ];
  }

  getByUserId(userId: string): [ResearchConfig] {
    return [ new ResearchConfig() ];
  }

  getById(id: string): ResearchConfig {
    return new ResearchConfig();
  }

  setResearchLive(id: string, isLive: boolean): boolean {
    console.log('Implement me! (publish research)');
    this.handleUpdate();
    return true;
  }

  deleteResearch(id: string): boolean {
    console.log('Implement me! (delete research)');
    this.handleDelete();
    return true;
  }

  updateResearch(researchConfig: ResearchConfig): boolean {
    console.log('Implement me! (update research)');
    this.handleUpdate();
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
