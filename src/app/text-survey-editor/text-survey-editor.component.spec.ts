import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSurveyEditorComponent } from './text-survey-editor.component';

describe('TextSurveyEditorComponent', () => {
  let component: TextSurveyEditorComponent;
  let fixture: ComponentFixture<TextSurveyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSurveyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSurveyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
