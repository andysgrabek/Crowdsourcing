import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import ResearchStep, {ResearchStepType} from '../dto/ResearchStep';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import ResearchAnnotation, {ResearchAnnotationType} from '../dto/ResearchAnnotation';
import {MatDialog} from '@angular/material/dialog';
import {EditResearchAnnotationComponent} from '../edit-research-annotation/edit-research-annotation.component';
import {ResearchAnnotationDelegate} from '../research-annotation-delegate/ResearchAnnotationDelegate';
import ResearchAnnotationDelegateFactory from '../research-annotation-delegate/ResearchAnnotationDelegateFactory';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-research-step',
  templateUrl: './research-step.component.html',
  styleUrls: ['./research-step.component.css', '../app.component.css']
})
export class ResearchStepComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatTable)
  tableList !: QueryList<MatTable<any>>;
  @Input()
  model: ResearchStep;
  stepTypes = ResearchStepType;
  rb: TranslationBundle;
  researchStepData = new Map<string, object | number>();
  currentDrawingState: AnnotationDrawingStates = AnnotationDrawingStates.NOT_LISTENING;
  canvas: HTMLCanvasElement;
  availableAnnotationTypes = ResearchAnnotationType;
  annotations: ResearchAnnotation[] = [];
  private readonly defaultLineWidth = 3;
  private readonly defaultStrokeStyle = '#ffff00';
  private readonly annotationCanvasName = 'annotationCanvas';
  private newAnnotation: ResearchAnnotation;
  private annotationDelegate: ResearchAnnotationDelegate;
  displayedColumns: string[] = ['index', 'action'];
  sanitizedUrl: SafeHtml;

  constructor(private tr: TranslationService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) {
    this.rb = tr.getComponentBundle('ResearchStepComponent');
  }

  ngOnInit() {
    this.researchStepData.set('start', new Date());
    this.researchStepData.set('type', this.model.type);
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.model.url})`);
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById(this.annotationCanvasName) as HTMLCanvasElement;
  }

  getStepData(): Map<string, object | number> {
    return this.researchStepData;
  }

  onEdit(annotation: ResearchAnnotation) {
    const dialogRef = this.dialog.open(EditResearchAnnotationComponent);
    dialogRef.componentInstance.annotation = annotation;
    dialogRef.componentInstance.onConfirm = (ann: ResearchAnnotation) => this.onConfirmEditAnnotation(ann);
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }

  onConfirmEditAnnotation(annotation: ResearchAnnotation) {
    this.annotations.push(annotation);
    this.newAnnotation = undefined;
    this.currentDrawingState = AnnotationDrawingStates.NOT_LISTENING;
  }

  onMouseUpOrLeave(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.DRAWING) {
      this.currentDrawingState = AnnotationDrawingStates.NOT_LISTENING;
      this.newAnnotation.points = this.annotationDelegate.end({x: event.layerX, y: event.layerY});
      this.annotations.push(this.newAnnotation);
      this.tableList.first.renderRows();
      this.newAnnotation = undefined;
      this.annotationDelegate = undefined;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.DRAWING) {
      this.annotationDelegate.move({x: event.layerX, y: event.layerY});
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.IDLE) {
      this.currentDrawingState = AnnotationDrawingStates.DRAWING;
      this.annotationDelegate = ResearchAnnotationDelegateFactory.createDelegate(this.newAnnotation.type, this.canvas);
      this.annotationDelegate.start({x: event.layerX, y: event.layerY});
    }
  }

  onAddAnnotation(annotationType: ResearchAnnotationType) {
    this.currentDrawingState = AnnotationDrawingStates.IDLE;
    this.newAnnotation = new ResearchAnnotation(annotationType, '', []);
  }

  visualizeAnnotation(annotation: ResearchAnnotation) {
    const points = annotation.points;
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = this.defaultStrokeStyle;
    context.lineWidth = this.defaultLineWidth;
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
    }
    context.lineTo(points[0].x, points[0].y);
    context.stroke();
  }

  async clearVisualizeAnnotation() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  async onDeleteAnnotation(annotation: ResearchAnnotation) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = this.rb.get('annotation-delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      this.annotations = this.annotations.filter(ann => annotation !== ann);
      this.tableList.first.renderRows();
      this.clearVisualizeAnnotation();
      dialogRef.close();
    };
    dialogRef.componentInstance.onCancel = () => dialogRef.close();
  }
}

enum AnnotationDrawingStates {
  NOT_LISTENING,
  IDLE,
  DRAWING,
}
