import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchSurveyConfigComponent } from './research-survey-config.component';

describe('ResearchSurveyConfigComponent', () => {
  let component: ResearchSurveyConfigComponent;
  let fixture: ComponentFixture<ResearchSurveyConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchSurveyConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchSurveyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
