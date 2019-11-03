import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTutorialEditorComponent } from './video-tutorial-editor.component';

describe('VideoTutorialEditorComponent', () => {
  let component: VideoTutorialEditorComponent;
  let fixture: ComponentFixture<VideoTutorialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTutorialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTutorialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
