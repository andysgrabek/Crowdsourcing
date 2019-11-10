import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStepEditorComponent } from './video-step-editor.component';

describe('VideoStepEditorComponent', () => {
  let component: VideoStepEditorComponent;
  let fixture: ComponentFixture<VideoStepEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStepEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStepEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
