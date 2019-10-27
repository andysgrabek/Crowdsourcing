import { Injectable } from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';

@Injectable({
  providedIn: 'root'
})
export class ResearchConfigService {

  constructor() { }

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
    return true;
  }

  deleteResearch(id: string): boolean {
    console.log('Implement me! (delete research)');
    return true;
  }

  updateResearch(researchConfig: ResearchConfig): boolean {
    console.log('Implement me! (update research)');
    return true;
  }

}
