import {Component, OnInit, ViewChild} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatDialog, MatTable} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AbstractSurveyEditor} from '../abstract-survey-editor/abstract-survey-editor';
import {TextSurveyEditorComponent} from '../text-survey-editor/text-survey-editor.component';
import {MultipleChoiceSurveyEditorComponent} from '../multiple-choice-survey-editor/multiple-choice-survey-editor.component';
import ResearchSurvey, {ResearchSurveyType} from '../dto/ResearchSurvey';

@Component({
  selector: 'app-research-config-survey',
  templateUrl: './research-config-survey.component.html',
  styleUrls: ['./research-config-survey.component.css', '../app.component.css']
})
export class ResearchConfigSurveyComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<any>;
  private readonly editors = new Map<ResearchSurveyType, ComponentType<AbstractSurveyEditor>>([
    [ResearchSurveyType.TEXT, TextSurveyEditorComponent],
    [ResearchSurveyType.RADIO, MultipleChoiceSurveyEditorComponent],
    [ResearchSurveyType.CHECKBOX, MultipleChoiceSurveyEditorComponent]
  ]);
  public researchConfig: ResearchConfig;
  researchSurveyTypes = ResearchSurveyType;
  displayedColumns = ['name', 'type', 'action'];
  private id: string;

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchConfigService.getById(this.id).subscribe(res => {
      this.researchConfig = res;
    });
  }

  async onEdit(survey: ResearchSurvey) {
    const dialogRef = this.dialog.open(this.editors.get(survey.type));
    dialogRef.componentInstance.survey = Object.assign(new ResearchSurvey(), survey);
    dialogRef.componentInstance.onConfirm = (newSurvey) => this.onConfirmSurveyEdit(dialogRef, survey, newSurvey);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  async onDelete(survey: ResearchSurvey) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => this.onConfirmSurveyDelete(dialogRef, survey);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  async onAddNew(type: ResearchSurveyType) {
    const dialogRef = this.dialog.open(this.editors.get(type));
    const survey = new ResearchSurvey();
    survey.type = type;
    dialogRef.componentInstance.survey = survey;
    dialogRef.componentInstance.onConfirm = (newSurvey) => this.onConfirmSurveyAdd(dialogRef, newSurvey);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  private onConfirmSurveyAdd(dialogRef, survey: ResearchSurvey) {
    dialogRef.close();
    this.researchConfig.surveys.push(survey);
    if (this.researchConfigService.updateResearch(this.id, this.researchConfig)) {
      this.researchTable.renderRows();
    }
  }

  private onConfirmSurveyEdit(dialogRef, survey: ResearchSurvey, newSurvey) {
    dialogRef.close();
    Object.assign(this.researchConfig.surveys.find(con => con === survey), newSurvey);
    this.researchConfigService.updateResearch(this.id, this.researchConfig);
  }

  private onConfirmSurveyDelete(dialogRef, survey: ResearchSurvey) {
    dialogRef.close();
    this.researchConfig.surveys = this.researchConfig.surveys.filter(con => con !== survey);
    this.researchConfigService.updateResearch(this.id, this.researchConfig);
  }

}

