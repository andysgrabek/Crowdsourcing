import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTutorialEditorComponent } from './image-tutorial-editor.component';

describe('ImageTutorialEditorComponent', () => {
  let component: ImageTutorialEditorComponent;
  let fixture: ComponentFixture<ImageTutorialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTutorialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTutorialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
