import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTutorialEditorComponent } from './text-tutorial-editor.component';

describe('TextTutorialEditorComponent', () => {
  let component: TextTutorialEditorComponent;
  let fixture: ComponentFixture<TextTutorialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTutorialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTutorialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
