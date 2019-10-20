import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigTutorialComponent } from './research-config-tutorial.component';

describe('ResearchConfigTutorialComponent', () => {
  let component: ResearchConfigTutorialComponent;
  let fixture: ComponentFixture<ResearchConfigTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
