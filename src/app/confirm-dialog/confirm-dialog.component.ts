import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  text = '';
  showConfirm = true;
  showCancel = true;
  onConfirm: () => void = () => {};
  onCancel: () => void = () => {};

  constructor() { }

  ngOnInit() {
  }

}
