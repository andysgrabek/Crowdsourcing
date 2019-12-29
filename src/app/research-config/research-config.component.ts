import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConfigService} from '../service/research-config.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {Observable, Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-research-config',
  templateUrl: './research-config.component.html',
  styleUrls: ['./research-config.component.css']
})
export class ResearchConfigComponent implements OnInit, OnDestroy {

  id: string;
  rb: TranslationBundle;
  researchConfig: ResearchConfig;
  private researchSubscription: Subscription;
  consentUrl: Observable<any>;
  tutorialUrl: Observable<any>;
  ctScanUrl: Observable<any>;
  serverUrl: Observable<any>;
  confusedUrl: Observable<any>;
  publishUrl: Observable<any>;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute,
              private tr: TranslationService,
              private storage: AngularFireStorage) {
    this.rb = tr.getComponentBundle('ResearchConfigComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchSubscription = this.researchConfigService.getById(this.id).subscribe(res => {
      this.researchConfig = res;
    });
    this.consentUrl = this.storage.ref('assets/images/research-config/consent.png').getDownloadURL();
    this.tutorialUrl = this.storage.ref('assets/images/research-config/education.png').getDownloadURL();
    this.ctScanUrl = this.storage.ref('assets/images/research-config/ct-scan.png').getDownloadURL();
    this.serverUrl = this.storage.ref('assets/images/research-config/server.png').getDownloadURL();
    this.confusedUrl = this.storage.ref('assets/images/research-config/confused.png').getDownloadURL();
    this.publishUrl = this.storage.ref('assets/images/research-config/publish.png').getDownloadURL();
  }

  ngOnDestroy() {
    this.researchSubscription.unsubscribe();
  }

  async onPublish(researchConfig: ResearchConfig) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = this.rb.get('publish-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfigService.setResearchLive(this.id, researchConfig, true);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onUnPublish(researchConfig: ResearchConfig) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = this.rb.get('unpublish-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfigService.setResearchLive(this.id, researchConfig, false);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }
}
