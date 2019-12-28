import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchAnnotationComponent } from './edit-research-annotation.component';

describe('EditResearchAnnotationComponent', () => {
  let component: EditResearchAnnotationComponent;
  let fixture: ComponentFixture<EditResearchAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResearchAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResearchAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
