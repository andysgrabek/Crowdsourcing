import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConsentWrapperComponent } from './research-consent-wrapper.component';

describe('ResearchConsentWrapperComponent', () => {
  let component: ResearchConsentWrapperComponent;
  let fixture: ComponentFixture<ResearchConsentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConsentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConsentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
