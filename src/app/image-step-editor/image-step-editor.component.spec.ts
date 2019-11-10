import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStepEditorComponent } from './image-step-editor.component';

describe('ImageStepEditorComponent', () => {
  let component: ImageStepEditorComponent;
  let fixture: ComponentFixture<ImageStepEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageStepEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageStepEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
