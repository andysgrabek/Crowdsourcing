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
import {AnnotationVisualizerService} from '../service/annotation-visualizer.service';
import ResearchStepData from '../dto/ResearchStepData';

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
  researchStepData = new ResearchStepData();
  currentDrawingState: AnnotationDrawingStates = AnnotationDrawingStates.NOT_LISTENING;
  canvas: HTMLCanvasElement;
  availableAnnotationTypes = ResearchAnnotationType;
  annotations: ResearchAnnotation[] = [];
  private readonly annotationCanvasName = 'annotationCanvas';
  private newAnnotation: ResearchAnnotation;
  private annotationDelegate: ResearchAnnotationDelegate;
  displayedColumns: string[] = ['index', 'type', 'action'];
  sanitizedUrl: SafeHtml;
  freeComment = '';
  private editedAnnotation: ResearchAnnotation;
  cursor = this.editedAnnotation ? 'cell' : 'crosshair';
  brushRadius = () => this.canvas.width / 40;

  constructor(private tr: TranslationService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private visualizer: AnnotationVisualizerService) {
    this.rb = tr.getComponentBundle('ResearchStepComponent');
  }

  ngOnInit() {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.model.url})`);
  }

  ngAfterViewInit() {
    this.researchStepData.startTimeStamp = Date.now();
    this.researchStepData.stepType = this.model.type;
    this.canvas = document.getElementById(this.annotationCanvasName) as HTMLCanvasElement;
  }

  getStepData(): ResearchStepData {
    this.researchStepData.endTimeStamp = Date.now();
    this.researchStepData.annotations = this.annotations;
    this.researchStepData.freeComment = this.freeComment || '';
    return this.researchStepData;
  }

  async onFinalizeAddAnnotation() {
    const dialogRef = this.dialog.open(EditResearchAnnotationComponent, {autoFocus: false});
    dialogRef.componentInstance.annotation = this.newAnnotation;
    dialogRef.componentInstance.onConfirm = (ann: ResearchAnnotation) => {
      this.onConfirmFinalizeAddAnnotation(ann);
      dialogRef.close();
    };
  }

  async onEdit(annotation: ResearchAnnotation) {
    const dialogRef = this.dialog.open(EditResearchAnnotationComponent, {autoFocus: false});
    const annotationCopy = new ResearchAnnotation();
    Object.assign(annotationCopy, annotation);
    dialogRef.componentInstance.annotation = annotationCopy;
    dialogRef.componentInstance.onConfirm = (ann: ResearchAnnotation) => {
      this.onConfirmEditAnnotation(ann, annotation);
      dialogRef.close();
    };
  }

  async onConfirmEditAnnotation(annotation: ResearchAnnotation, originalAnnotation: ResearchAnnotation) {
    Object.assign(this.annotations.find(a => a === originalAnnotation), annotation);
    this.tableList.first.renderRows();
  }

  async onConfirmFinalizeAddAnnotation(annotation: ResearchAnnotation) {
    this.annotations.push(annotation);
    this.tableList.first.renderRows();
    this.newAnnotation = undefined;
    this.currentDrawingState = AnnotationDrawingStates.NOT_LISTENING;
  }

  private getPointInCanvas(event: MouseEvent): {x: number, y: number} {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  async onMouseUpOrLeave(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.DRAWING && event.button === 0) {
      // only execute when left mouse button is lifted
      this.currentDrawingState = AnnotationDrawingStates.NOT_LISTENING;
      this.newAnnotation.points = this.annotationDelegate.end(this.getPointInCanvas(event));
      this.onFinalizeAddAnnotation();
      this.newAnnotation = undefined;
      this.annotationDelegate = undefined;
    } else if (this.currentDrawingState === AnnotationDrawingStates.AWAITING_CORRECTION && event.button === 2) {
      // only execute when the right mouse button is pressed
      this.clearVisualizeAnnotation();
      this.editedAnnotation = undefined;
      this.currentDrawingState = AnnotationDrawingStates.NOT_LISTENING;
    } else if (this.currentDrawingState === AnnotationDrawingStates.CORRECTING && event.button === 0) {
      this.currentDrawingState = AnnotationDrawingStates.AWAITING_CORRECTION;
      this.clearVisualizeAnnotation();
      this.visualizeAnnotation(this.editedAnnotation);
    }
  }

  async onMouseMove(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.DRAWING) {
      this.annotationDelegate.move(this.getPointInCanvas(event), event);
    } else if (this.currentDrawingState === AnnotationDrawingStates.AWAITING_CORRECTION) {
      this.clearVisualizeAnnotation();
      this.visualizeAnnotation(this.editedAnnotation);
    } else if (this.currentDrawingState === AnnotationDrawingStates.CORRECTING && event.buttons === 1) {
      this.clearVisualizeAnnotation();
      this.visualizeAnnotation(this.editedAnnotation);
      const rawPoint = this.getPointInCanvas(event);
      const mousePoint = {x: rawPoint.x / this.canvas.width, y: rawPoint.y / this.canvas.height};
      this.editedAnnotation.points.forEach(pt => {
        if (Math.hypot(pt.x - mousePoint.x, pt.y - mousePoint.y) < this.brushRadius() / this.canvas.width) {
          const denominator = Math.hypot(pt.x - mousePoint.x, pt.y - mousePoint.y);
          const targetX = mousePoint.x + this.brushRadius() / this.canvas.width * (pt.x - mousePoint.x) / denominator;
          const targetY = mousePoint.y + this.brushRadius() / this.canvas.width * (pt.y - mousePoint.y) / denominator;
          pt.x = targetX;
          pt.y = targetY;
        }
      });
      const context = this.canvas.getContext('2d');
      context.strokeStyle = '#000000';
      context.beginPath();
      context.arc(rawPoint.x, rawPoint.y, this.brushRadius(), 0, 2 * Math.PI);
      context.stroke();
    }
  }

  async onMouseDown(event: MouseEvent) {
    if (this.currentDrawingState === AnnotationDrawingStates.IDLE && event.button === 0) {
      // only execute when the left mouse button is pressed
      await this.onResize();
      this.currentDrawingState = AnnotationDrawingStates.DRAWING;
      this.annotationDelegate = ResearchAnnotationDelegateFactory.createDelegate(this.newAnnotation.annotationType, this.canvas);
      this.annotationDelegate.start(this.getPointInCanvas(event));
    } else if (this.currentDrawingState === AnnotationDrawingStates.AWAITING_CORRECTION && event.button === 0) {
      // only execute when the left mouse button is pressed
      this.visualizeAnnotation(this.editedAnnotation);
      this.currentDrawingState = AnnotationDrawingStates.CORRECTING;
    }
  }

  async onAddAnnotation(annotationType: ResearchAnnotationType) {
    this.currentDrawingState = AnnotationDrawingStates.IDLE;
    this.newAnnotation = new ResearchAnnotation(annotationType, '', []);
  }

  visualizeAnnotation(annotation: ResearchAnnotation) {
    const context = this.canvas.getContext('2d');
    this.visualizer.visualize(annotation, context, this.canvas);
  }

  clearVisualizeAnnotation() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  async onDeleteAnnotation(annotation: ResearchAnnotation) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {autoFocus: false});
    dialogRef.componentInstance.text = this.rb.get('annotation-delete-confirmation');
    dialogRef.componentInstance.onConfirm = () => {
      this.annotations = this.annotations.filter(ann => annotation !== ann);
      this.tableList.first.renderRows();
      this.clearVisualizeAnnotation();
      dialogRef.close();
    };
  }

  async onResize() {
    const targetHeight = this.canvas.getBoundingClientRect().height;
    const targetWidth = this.canvas.getBoundingClientRect().width;
    this.canvas.height = targetHeight;
    this.canvas.width = targetWidth;
  }

  async onContextMenu($event: MouseEvent) {
    $event.preventDefault();
  }

  async onEditCurve(annotation: ResearchAnnotation) {
    this.editedAnnotation = annotation;
    this.currentDrawingState = AnnotationDrawingStates.AWAITING_CORRECTION;
    this.visualizeAnnotation(this.editedAnnotation);
  }

}

enum AnnotationDrawingStates {
  NOT_LISTENING,
  IDLE,
  DRAWING,
  AWAITING_CORRECTION,
  CORRECTING
}
