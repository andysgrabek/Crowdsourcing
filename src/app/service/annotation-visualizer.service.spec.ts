import { TestBed } from '@angular/core/testing';

import { AnnotationVisualizerService } from './annotation-visualizer.service';

describe('AnnotationVisualizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnotationVisualizerService = TestBed.get(AnnotationVisualizerService);
    expect(service).toBeTruthy();
  });
});
