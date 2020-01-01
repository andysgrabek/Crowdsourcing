import { Component, OnInit } from '@angular/core';
import {AbstractStepEditor} from '../abstract-step-editor/abstract-step-editor';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-image-step-editor',
  templateUrl: './image-step-editor.component.html',
  styleUrls: ['./image-step-editor.component.css']
})
export class ImageStepEditorComponent extends AbstractStepEditor implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService, private dialogRefInj: MatDialogRef<ImageStepEditorComponent>) {
    super(dialogRefInj);
    this.rb = tr.getComponentBundle('ImageStepEditorComponent');
  }

  ngOnInit() {
  }

}
