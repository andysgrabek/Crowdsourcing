import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConsent} from '../dto/ResearchConsent';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ConsentEditDialogComponent} from '../consent-edit-dialog/consent-edit-dialog.component';

@Component({
  selector: 'app-research-config-consent',
  templateUrl: './research-config-consent.component.html',
  styleUrls: ['./research-config-consent.component.css']
})
export class ResearchConfigConsentComponent implements OnInit {

  public researchConfig: ResearchConfig;

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.researchConfig = this.researchConfigService.getById(this.route.snapshot.paramMap.get('id'));
  }

  async onEdit(consent: ResearchConsent) {
    const dialogRef = this.dialog.open(ConsentEditDialogComponent);
    dialogRef.componentInstance.consent = Object.assign(new ResearchConsent(), consent);
    dialogRef.componentInstance.onConfirm = (newConsent) => {
      dialogRef.close();
      Object.assign(this.researchConfig.consents.find(con => con === consent), newConsent);
      this.researchConfigService.updateResearch(this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onDelete(consent: ResearchConsent) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfig.consents = this.researchConfig.consents.filter(con => con !== consent);
      this.researchConfigService.updateResearch(this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

}
