import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigSurveyComponent } from './research-config-survey.component';

describe('ResearchConfigSurveyComponent', () => {
  let component: ResearchConfigSurveyComponent;
  let fixture: ComponentFixture<ResearchConfigSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
