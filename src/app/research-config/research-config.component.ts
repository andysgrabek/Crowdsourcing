import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConfigService} from '../service/research-config.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-research-config',
  templateUrl: './research-config.component.html',
  styleUrls: ['./research-config.component.css']
})
export class ResearchConfigComponent implements OnInit {

  id: string;
  rb: TranslationBundle;
  researchObservable: Observable<ResearchConfig>;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchConfigComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchObservable = this.researchConfigService.getById(this.id);
  }

  async onToggle(researchConfig: ResearchConfig) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    if (researchConfig.isLive) {
      dialogRef.componentInstance.text = 'Are you sure you want to unpublish your research?';
      dialogRef.componentInstance.onConfirm = () => {
        dialogRef.close();
        this.researchConfigService.setResearchLive(this.id, researchConfig, false);
      };
    } else {
      dialogRef.componentInstance.text = 'Are you sure you want to publish your research?';
      dialogRef.componentInstance.onConfirm = () => {
        dialogRef.close();
        this.researchConfigService.setResearchLive(this.id, researchConfig, true);
      };
    }
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }
}
