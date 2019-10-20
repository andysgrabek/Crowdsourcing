import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConsentComponent } from './research-consent.component';

describe('ResearchConsentComponent', () => {
  let component: ResearchConsentComponent;
  let fixture: ComponentFixture<ResearchConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
