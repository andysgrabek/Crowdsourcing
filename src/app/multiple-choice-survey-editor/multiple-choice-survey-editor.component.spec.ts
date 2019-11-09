import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceSurveyEditorComponent } from './multiple-choice-survey-editor.component';

describe('MultipleChoiceSurveyEditorComponent', () => {
  let component: MultipleChoiceSurveyEditorComponent;
  let fixture: ComponentFixture<MultipleChoiceSurveyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceSurveyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceSurveyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
