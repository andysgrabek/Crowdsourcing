import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchSurveyComponent } from './research-survey.component';

describe('ResearchSurveyComponent', () => {
  let component: ResearchSurveyComponent;
  let fixture: ComponentFixture<ResearchSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
