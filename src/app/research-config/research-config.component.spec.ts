import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigComponent } from './research-config.component';

describe('ResearchConfigComponent', () => {
  let component: ResearchConfigComponent;
  let fixture: ComponentFixture<ResearchConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
