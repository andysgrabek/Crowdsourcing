import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDataComponent } from './research-data.component';

describe('ResearchDataComponent', () => {
  let component: ResearchDataComponent;
  let fixture: ComponentFixture<ResearchDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
