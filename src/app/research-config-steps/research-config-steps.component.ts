import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import ResearchStep, {ResearchStepType} from '../dto/ResearchStep';
import {ComponentType} from '@angular/cdk/overlay';
import {AbstractStepEditor} from '../abstract-step-editor/abstract-step-editor';
import {ImageStepEditorComponent} from '../image-step-editor/image-step-editor.component';
import {VideoStepEditorComponent} from '../video-step-editor/video-step-editor.component';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {ConsentEditDialogComponent} from "../consent-edit-dialog/consent-edit-dialog.component";

@Component({
  selector: 'app-research-config-steps',
  templateUrl: './research-config-steps.component.html',
  styleUrls: ['./research-config-steps.component.css', '../app.component.css']
})
export class ResearchConfigStepsComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<ResearchStep>;
  public researchConfig: ResearchConfig;
  public displayedColumns: string[] = ['number', 'name', 'type', 'action'];
  private id: string;
  researchStepTypes = ResearchStepType;
  rb: TranslationBundle;
  private readonly editors = new Map<ResearchStepType, ComponentType<AbstractStepEditor>>([
    [ResearchStepType.IMAGE, ImageStepEditorComponent],
    [ResearchStepType.VIDEO, VideoStepEditorComponent]
  ]);

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchConfigStepsComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchConfigService.getById(this.id).subscribe(res => {
      this.researchConfig = res;
    });
  }

  async onEdit(step: ResearchStep) {
    const dialogRef = this.dialog.open(this.editors.get(step.type), {autoFocus: false});
    dialogRef.componentInstance.step = Object.assign(new ResearchStep(), step);
    dialogRef.componentInstance.onConfirm = (newStep) => {
      dialogRef.close();
      Object.assign(this.researchConfig.steps.find(con => con === step), newStep);
      this.researchConfigService.updateResearch(this.id, this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onDelete(step: ResearchStep) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.text = this.rb.get('delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfig.steps = this.researchConfig.steps.filter(con => con !== step);
      this.researchConfigService.updateResearch(this.id, this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onAddNew(type: ResearchStepType) {
    const dialogRef = this.dialog.open(this.editors.get(type));
    dialogRef.componentInstance.step = new ResearchStep();
    dialogRef.componentInstance.onConfirm = (c) => this.onConfirmStepAdd(dialogRef, c);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  private async onConfirmStepAdd(dialogRef, step: ResearchStep) {
    dialogRef.close();
    if (this.researchConfig.steps) {
      this.researchConfig.steps.push(step);
    } else {
      this.researchConfig.steps = [step];
    }
    try {
      await this.researchConfigService.updateResearch(this.id, this.researchConfig);
    } finally {

    }
  }

}
