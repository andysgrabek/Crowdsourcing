import { Injectable } from '@angular/core';

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

  getByResearchId(researchId: string): ResearchConfig {
    return  new ResearchConfig();
  }

  getById(id: string): ResearchConfig {
    return  new ResearchConfig();
  }

}
