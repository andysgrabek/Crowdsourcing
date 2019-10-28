import {Component, Input, OnInit} from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';

@Component({
  selector: 'app-research-config-list',
  templateUrl: './research-config-list.component.html',
  styleUrls: ['./research-config-list.component.css']
})
export class ResearchConfigListComponent implements OnInit {

  public model: [ResearchConfig];

  constructor(private dialog: MatDialog,
              private snackBack: MatSnackBar,
              private router: Router,
              public researchConfigService: ResearchConfigService) {

  }

  ngOnInit() {
    this.model = this.researchConfigService.getAll();
    // Todo get by userId
  }

  async onEdit(id: string) {
    await this.router.navigateByUrl('research-config/' + id);
  }

  async onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      if (this.researchConfigService.deleteResearch(id)) {
        this.snackBack.open('Successfully removed research');
      } else {
        this.snackBack.open('Failed to remove research');
      }
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }
}
