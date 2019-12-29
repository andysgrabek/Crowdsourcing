import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareResearchDialogComponent } from './share-research-dialog.component';

describe('ShareResearchDialogComponent', () => {
  let component: ShareResearchDialogComponent;
  let fixture: ComponentFixture<ShareResearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareResearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareResearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
