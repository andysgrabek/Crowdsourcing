import {Component, Input, OnInit} from '@angular/core';
import ResearchTutorial, {ResearchTutorialType} from '../dto/ResearchTutorial';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-research-tutorial',
  templateUrl: './research-tutorial.component.html',
  styleUrls: ['./research-tutorial.component.css']
})
export class ResearchTutorialComponent implements OnInit {

  @Input()
  tutorial: ResearchTutorial;
  ytUrl: SafeResourceUrl;
  researchTutorialTypes = ResearchTutorialType;
  rb: TranslationBundle;

  constructor(private sanitizer: DomSanitizer, private tr: TranslationService) {
    this.rb = tr.getComponentBundle('ResearchTutorialComponent');
  }

  ngOnInit() {
    this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.url);
  }

}
