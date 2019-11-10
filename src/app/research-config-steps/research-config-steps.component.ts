import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import ResearchConsent from '../dto/ResearchConsent';
import {ResearchConfig} from '../dto/ResearchConfig';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import ResearchStep from '../dto/ResearchStep';
import {ComponentType} from '@angular/cdk/overlay';
import {AbstractStepEditor} from '../abstract-step-editor/abstract-step-editor';
import {ImageStepEditorComponent} from '../image-step-editor/image-step-editor.component';
import {VideoStepEditorComponent} from '../video-step-editor/video-step-editor.component';

@Component({
  selector: 'app-research-config-steps',
  templateUrl: './research-config-steps.component.html',
  styleUrls: ['./research-config-steps.component.css', '../app.component.css']
})
export class ResearchConfigStepsComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<ResearchStep>;
  public researchConfig: ResearchConfig;
  public displayedColumns: string[] = ['name', 'type', 'action'];
  private readonly editors = new Map<string, ComponentType<AbstractStepEditor>>([
    ['image', ImageStepEditorComponent],
    ['video', VideoStepEditorComponent]
  ]);

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.researchConfig = this.researchConfigService.getById(this.route.snapshot.paramMap.get('id'));
  }

  async onEdit(step: ResearchStep) {
    const dialogRef = this.dialog.open(this.editors.get(step.type));
    dialogRef.componentInstance.step = Object.assign(new ResearchStep(), step);
    dialogRef.componentInstance.onConfirm = (newStep) => {
      dialogRef.close();
      Object.assign(this.researchConfig.steps.find(con => con === step), newStep);
      this.researchConfigService.updateResearch(this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onDelete(step: ResearchStep) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      this.researchConfig.steps = this.researchConfig.steps.filter(con => con !== step);
      this.researchConfigService.updateResearch(this.researchConfig);
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onAddNew(type: string) {
    const dialogRef = this.dialog.open(this.editors.get(type));
    dialogRef.componentInstance.step = new ResearchStep();
    dialogRef.componentInstance.onConfirm = (c) => this.onConfirmStepAdd(dialogRef, c);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  private onConfirmStepAdd(dialogRef, step: ResearchStep) {
    dialogRef.close();
    this.researchConfig.steps.push(step);
    if (this.researchConfigService.updateResearch(this.researchConfig)) {
      this.researchTable.renderRows();
    }
  }

}
