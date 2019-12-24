import { Component, OnInit } from '@angular/core';
import {AbstractTutorialEditor} from '../abstract-tutorial-editor/abstract-tutorial-editor';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-image-tutorial-editor',
  templateUrl: './image-tutorial-editor.component.html',
  styleUrls: ['./image-tutorial-editor.component.css']
})
export class ImageTutorialEditorComponent extends AbstractTutorialEditor implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    super();
    this.rb = tr.getComponentBundle('ImageTutorialEditorComponent');
  }

  ngOnInit() {
  }

}
