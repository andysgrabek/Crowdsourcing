import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentEditDialogComponent } from './consent-edit-dialog.component';

describe('ConsentEditDialogComponent', () => {
  let component: ConsentEditDialogComponent;
  let fixture: ComponentFixture<ConsentEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
