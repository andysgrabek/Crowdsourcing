import { Component, OnInit } from '@angular/core';
import ResearchConsent from '../dto/ResearchConsent';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import ResearchAnnotation from '../dto/ResearchAnnotation';

@Component({
  selector: 'app-edit-research-annotation',
  templateUrl: './edit-research-annotation.component.html',
  styleUrls: ['./edit-research-annotation.component.css']
})
export class EditResearchAnnotationComponent implements OnInit {

  annotation: ResearchAnnotation;
  showCancel = true;
  showConfirm = true;
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = this.tr.getComponentBundle('EditResearchAnnotationComponent');
  }

  ngOnInit() {

  }

  onConfirm: (newAnnotation: ResearchAnnotation) => void = () => {};

  onCancel: () => void = () => {};

  onTextChange(value: string) {
    this.annotation.comment = value;
  }

}
