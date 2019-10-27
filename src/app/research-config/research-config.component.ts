import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConfigService} from '../service/research-config.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-research-config',
  templateUrl: './research-config.component.html',
  styleUrls: ['./research-config.component.css']
})
export class ResearchConfigComponent implements OnInit {

  isLive: boolean;
  researchConfig: ResearchConfig;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.researchConfig = this.researchConfigService.getById(this.route.snapshot.paramMap.get('id'));
    this.isLive = this.researchConfig.isLive;
  }

  onToggle() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    if (this.isLive) {
      dialogRef.componentInstance.text = 'Are you sure you want to unpublish your research?';
      dialogRef.componentInstance.onConfirm = () => {
        dialogRef.close();
        if (this.researchConfigService.setResearchLive(this.researchConfig.id, false)) {
          this.snackBar.open('Successfully unpublished research');
        } else {
          this.snackBar.open('Failed to unpublish research');
        }
      };
    } else {
      dialogRef.componentInstance.text = 'Are you sure you want to publish your research?';
      dialogRef.componentInstance.onConfirm = () => {
        dialogRef.close();
        if (this.researchConfigService.setResearchLive(this.researchConfig.id, true)) {
          this.snackBar.open('Successfully published research');
        } else {
          this.snackBar.open('Failed to publish research');
        }
      };
    }
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
    this.isLive = !this.isLive;
  }

}
