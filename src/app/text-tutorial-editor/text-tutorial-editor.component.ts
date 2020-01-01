import { Component, OnInit } from '@angular/core';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-text-tutorial-editor',
  templateUrl: './text-tutorial-editor.component.html',
  styleUrls: ['./text-tutorial-editor.component.css']
})
export class TextTutorialEditorComponent extends AbstractTutorialEditor implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService, private dialogRefInj: MatDialogRef<TextTutorialEditorComponent>) {
    super(dialogRefInj);
    this.rb = tr.getComponentBundle('TextTutorialEditorComponent');
  }

  ngOnInit() {
  }

}
