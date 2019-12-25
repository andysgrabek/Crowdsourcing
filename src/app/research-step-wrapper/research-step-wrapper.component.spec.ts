import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchStepWrapperComponent } from './research-step-wrapper.component';

describe('ResearchStepWrapperComponent', () => {
  let component: ResearchStepWrapperComponent;
  let fixture: ComponentFixture<ResearchStepWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchStepWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchStepWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
