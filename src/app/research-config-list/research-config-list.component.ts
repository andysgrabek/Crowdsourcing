import {Component, Input, OnInit} from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-research-config-list',
  templateUrl: './research-config-list.component.html',
  styleUrls: ['./research-config-list.component.css']
})
export class ResearchConfigListComponent implements OnInit {

  @Input()
  private model: [ResearchConfig];

  constructor(private dialog: MatDialog,
              private snackBack: MatSnackBar,
              private router: Router) {

  }

  ngOnInit() {
  }

  async onEdit(id: string) {
    id = 'dummy';
    await this.router.navigateByUrl('research-config/' + id);
  }

  async onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      // delete research with id from ResearchConfigService
      // TODO if success -> show success snackbar, else show fail snackbar
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }
}
