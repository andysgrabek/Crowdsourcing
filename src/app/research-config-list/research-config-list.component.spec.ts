import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchConfigListComponent } from './research-config-list.component';

describe('ResearchConfigListComponent', () => {
  let component: ResearchConfigListComponent;
  let fixture: ComponentFixture<ResearchConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
