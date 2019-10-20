import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigStepsComponent } from './research-config-steps.component';

describe('ResearchConfigStepsComponent', () => {
  let component: ResearchConfigStepsComponent;
  let fixture: ComponentFixture<ResearchConfigStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
