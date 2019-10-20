import { TestBed } from '@angular/core/testing';

import { ResearchConfigService } from './research-config.service';

describe('ResearchConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResearchConfigService = TestBed.get(ResearchConfigService);
    expect(service).toBeTruthy();
  });
});
