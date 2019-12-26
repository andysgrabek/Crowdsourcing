import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import ResearchStep, {ResearchStepType} from '../dto/ResearchStep';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research-step',
  templateUrl: './research-step.component.html',
  styleUrls: ['./research-step.component.css']
})
export class ResearchStepComponent implements OnInit, AfterViewInit {

  @Input()
  model: ResearchStep;
  stepTypes = ResearchStepType;
  rb: TranslationBundle;
  researchStepData = new Map<string, object | number>();
  private canvas: HTMLCanvasElement;
  private readonly annotationCanvasName = 'annotationCanvas';

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchStepComponent');
  }

  ngOnInit() {
    this.researchStepData.set('start', new Date());
    this.researchStepData.set('type', this.model.type);
  }

  getStepData(): Map<string, object | number> {
    return this.researchStepData;
  }

  onMouseEvent(event: MouseEvent) {
    switch (event.type) {
      case MouseEventTypeNames.MOUSE_MOVE:
        break;
      case MouseEventTypeNames.MOUSE_DOWN:
        break;
      case MouseEventTypeNames.MOUSE_UP:
        break;
    }
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById(this.annotationCanvasName) as HTMLCanvasElement;
    this.canvas.addEventListener(MouseEventTypeNames.MOUSE_MOVE, this.onMouseEvent, false);
    this.canvas.addEventListener(MouseEventTypeNames.MOUSE_DOWN, this.onMouseEvent, false);
    this.canvas.addEventListener(MouseEventTypeNames.MOUSE_UP, this.onMouseEvent, false);
  }

}

enum AnnotationDrawingStates {
  NOT_LISTENING,
  IDLE,
  DRAWING,
}

enum MouseEventTypeNames {
  MOUSE_MOVE = 'mousemove',
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',

}
