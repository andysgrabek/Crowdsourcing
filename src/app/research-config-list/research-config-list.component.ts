import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-research-config-list',
  templateUrl: './research-config-list.component.html',
  styleUrls: ['./research-config-list.component.css']
})
export class ResearchConfigListComponent implements OnInit {

  @Input()
  private model: [ResearchConfig];

  constructor() { }

  ngOnInit() {
  }

}
