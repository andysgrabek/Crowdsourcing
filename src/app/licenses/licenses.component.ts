import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('LicensesComponent');
  }

  ngOnInit() {
  }

}
