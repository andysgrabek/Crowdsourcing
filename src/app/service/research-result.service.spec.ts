import { TestBed } from '@angular/core/testing';

import { ResearchResultService } from './research-result.service';

describe('ResearchResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResearchResultService = TestBed.get(ResearchResultService);
    expect(service).toBeTruthy();
  });
});
