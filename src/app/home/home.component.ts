import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('HomeComponent');
  }

  ngOnInit() {
  }

}
