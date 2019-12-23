import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ResearchConfig} from '../dto/ResearchConfig';
import {MatDialog, MatTable} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import ResearchTutorial from '../dto/ResearchTutorial';
import {ImageTutorialEditorComponent} from '../image-tutorial-editor/image-tutorial-editor.component';
import {TextTutorialEditorComponent} from '../text-tutorial-editor/text-tutorial-editor.component';
import {VideoTutorialEditorComponent} from '../video-tutorial-editor/video-tutorial-editor.component';
import {ComponentType} from '@angular/cdk/overlay';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';
import ResearchConsent from '../dto/ResearchConsent';
import ResearchSurvey from '../dto/ResearchSurvey';

@Component({
  selector: 'app-research-config-tutorial',
  templateUrl: './research-config-tutorial.component.html',
  styleUrls: ['./research-config-tutorial.component.css', '../app.component.css']
})
export class ResearchConfigTutorialComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<ResearchConsent>;
  private readonly editors = new Map<string, ComponentType<AbstractTutorialEditor>>([
    ['text', TextTutorialEditorComponent],
    ['image', ImageTutorialEditorComponent],
    ['video', VideoTutorialEditorComponent]
  ]);
  public researchConfig: ResearchConfig;
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

  async onEdit(tutorial: ResearchTutorial) {
    const dialogRef = this.dialog.open(this.editors.get(tutorial.type));
    dialogRef.componentInstance.tutorial = Object.assign(new ResearchTutorial(), tutorial);
    dialogRef.componentInstance.onConfirm = (newTutorial) => this.onConfirmTutorialEdit(dialogRef, tutorial, newTutorial);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  async onDelete(consent: ResearchTutorial) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => this.onConfirmTutorialDelete(dialogRef, consent);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  private onConfirmTutorialEdit(dialogRef, tutorial: ResearchTutorial, newTutorial) {
    dialogRef.close();
    Object.assign(this.researchConfig.tutorials.find(con => con === tutorial), newTutorial);
    this.researchConfigService.updateResearch(this.id, this.researchConfig);
  }

  private onConfirmTutorialDelete(dialogRef, consent: ResearchTutorial) {
    dialogRef.close();
    this.researchConfig.tutorials = this.researchConfig.tutorials.filter(con => con !== consent);
    this.researchConfigService.updateResearch(this.id, this.researchConfig);
  }

  async onAddNew(type: string) {
    const dialogRef = this.dialog.open(this.editors.get(type));
    const tutorial = new ResearchTutorial();
    tutorial.type = type;
    dialogRef.componentInstance.tutorial = tutorial;
    dialogRef.componentInstance.onConfirm = (newSurvey) => this.onConfirmTutorialAdd(dialogRef, newSurvey);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  private onConfirmTutorialAdd(dialogRef, tutorial: ResearchTutorial) {
    dialogRef.close();
    this.researchConfig.tutorials.push(tutorial);
    if (this.researchConfigService.updateResearch(this.id, this.researchConfig)) {
      this.researchTable.renderRows();
    }
  }

}
