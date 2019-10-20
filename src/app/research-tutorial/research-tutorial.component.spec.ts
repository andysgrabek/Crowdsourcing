import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchTutorialComponent } from './research-tutorial.component';

describe('ResearchTutorialComponent', () => {
  let component: ResearchTutorialComponent;
  let fixture: ComponentFixture<ResearchTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
