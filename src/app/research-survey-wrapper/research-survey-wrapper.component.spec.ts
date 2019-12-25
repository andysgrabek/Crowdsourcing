import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchSurveyWrapperComponent } from './research-survey-wrapper.component';

describe('ResearchSurveyWrapperComponent', () => {
  let component: ResearchSurveyWrapperComponent;
  let fixture: ComponentFixture<ResearchSurveyWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchSurveyWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchSurveyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
