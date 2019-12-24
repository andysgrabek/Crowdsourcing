import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';

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

  constructor(private tr: TranslationService) {
    this.rb = this.tr.getComponentBundle(this);
  }

  ngOnInit() {
  }

  onConfirm: () => void = () => {};
  onCancel: () => void = () => {};

}
