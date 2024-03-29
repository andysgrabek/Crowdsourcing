import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import ResearchConsent from '../dto/ResearchConsent';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ConsentEditDialogComponent} from '../consent-edit-dialog/consent-edit-dialog.component';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research-config-consent',
  templateUrl: './research-config-consent.component.html',
  styleUrls: ['./research-config-consent.component.css', '../app.component.css']
})
export class ResearchConfigConsentComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<ResearchConsent>;
  public researchConfig: ResearchConfig;
  public displayedColumns: string[] = ['number', 'text', 'mandatory', 'action'];
  private id: string;
  rb: TranslationBundle;

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchConfigConsentComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchConfigService.getById(this.id).subscribe(res => {
      this.researchConfig = res;
    });
  }

  async onEdit(consent: ResearchConsent) {
    const dialogRef = this.dialog.open(ConsentEditDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.consent = Object.assign(new ResearchConsent(), consent);
    dialogRef.componentInstance.onConfirm = (newConsent) => {
      dialogRef.close();
      Object.assign(this.researchConfig.consents.find(con => con === consent), newConsent);
      this.researchConfigService.updateResearch(this.id, this.researchConfig);
    };
  }

  async onDelete(consent: ResearchConsent) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.text = this.rb.get('delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfig.consents = this.researchConfig.consents.filter(con => con !== consent);
      this.researchConfigService.updateResearch(this.id, this.researchConfig);
    };
  }

  async onAddNew() {
    const dialogRef = this.dialog.open(ConsentEditDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.consent = new ResearchConsent();
    dialogRef.componentInstance.onConfirm = (c) => this.onConfirmConsentAdd(dialogRef, c);
  }

  private async onConfirmConsentAdd(dialogRef, consent: ResearchConsent) {
    dialogRef.close();
    if (this.researchConfig.consents) {
      this.researchConfig.consents.push(consent);
    } else {
      this.researchConfig.consents = [consent];
    }
    try {
      await this.researchConfigService.updateResearch(this.id, this.researchConfig);
    } finally {

    }
  }

}
