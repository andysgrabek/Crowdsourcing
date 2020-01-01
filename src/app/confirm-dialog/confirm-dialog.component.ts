import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  text = '';
  showConfirm = true;
  showCancel = true;
  rb: TranslationBundle;

  constructor(private tr: TranslationService,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.rb = this.tr.getComponentBundle('ConfirmDialogComponent');
  }

  ngOnInit() {
  }

  onConfirm: () => void = () => {};

  onCancel() {
    this.dialogRef.close();
  }

}
