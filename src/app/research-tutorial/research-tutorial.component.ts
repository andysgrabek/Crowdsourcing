import {Component, Input, OnInit} from '@angular/core';
import ResearchTutorial from '../dto/ResearchTutorial';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-research-tutorial',
  templateUrl: './research-tutorial.component.html',
  styleUrls: ['./research-tutorial.component.css']
})
export class ResearchTutorialComponent implements OnInit {

  @Input()
  tutorial: ResearchTutorial;
  ytUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.url);
  }

}
