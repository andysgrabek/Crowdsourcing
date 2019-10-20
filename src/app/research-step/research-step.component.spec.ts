import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchStepComponent } from './research-step.component';

describe('ResearchStepComponent', () => {
  let component: ResearchStepComponent;
  let fixture: ComponentFixture<ResearchStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
