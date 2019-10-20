import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigConsentComponent } from './research-config-consent.component';

describe('ResearchConfigConsentComponent', () => {
  let component: ResearchConfigConsentComponent;
  let fixture: ComponentFixture<ResearchConfigConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
