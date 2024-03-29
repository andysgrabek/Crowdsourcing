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
import {TranslationBundle, TranslationService} from '../service/translation.service';

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
  displayedColumns = ['number', 'name', 'type', 'action'];
  private id: string;
  rb: TranslationBundle;

  constructor(private dialog: MatDialog,
              private researchConfigService: ResearchConfigService,
              private router: Router,
              private route: ActivatedRoute,
              private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchConfigSurveyComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchConfigService.getById(this.id).subscribe(res => {
      this.researchConfig = res;
    });
  }

  async onEdit(survey: ResearchSurvey) {
    const dialogRef = this.dialog.open(this.editors.get(survey.type), {autoFocus: false});
    dialogRef.componentInstance.survey = Object.assign(new ResearchSurvey(), survey);
    dialogRef.componentInstance.onConfirm = (newSurvey) => this.onConfirmSurveyEdit(dialogRef, survey, newSurvey);
  }

  async onDelete(survey: ResearchSurvey) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.text = this.rb.get('delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => this.onConfirmSurveyDelete(dialogRef, survey);
  }

  async onAddNew(type: ResearchSurveyType) {
    const dialogRef = this.dialog.open(this.editors.get(type), {autoFocus: false});
    const survey = new ResearchSurvey();
    survey.type = type;
    dialogRef.componentInstance.survey = survey;
    dialogRef.componentInstance.onConfirm = (newSurvey) => this.onConfirmSurveyAdd(dialogRef, newSurvey);
  }

  private async onConfirmSurveyAdd(dialogRef, survey: ResearchSurvey) {
    dialogRef.close();
    if (this.researchConfig.surveys) {
      this.researchConfig.surveys.push(survey);
    } else {
      this.researchConfig.surveys = [survey];
    }
    try {
      await this.researchConfigService.updateResearch(this.id, this.researchConfig);
    } finally {

    }
  }

  private async onConfirmSurveyEdit(dialogRef, survey: ResearchSurvey, newSurvey) {
    dialogRef.close();
    Object.assign(this.researchConfig.surveys.find(con => con === survey), newSurvey);
    try {
      await this.researchConfigService.updateResearch(this.id, this.researchConfig);
    } finally {

    }
  }

  private async onConfirmSurveyDelete(dialogRef, survey: ResearchSurvey) {
    dialogRef.close();
    this.researchConfig.surveys = this.researchConfig.surveys.filter(con => con !== survey);
    try {
      await this.researchConfigService.updateResearch(this.id, this.researchConfig);
    } finally {

    }
  }

}

