import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  rb: TranslationBundle;

  constructor(private tr: TranslationService) {
    this.rb = tr.getComponentBundle('FooterComponent');
  }

  ngOnInit() {
  }

  async setLocale(locale: string) {
    this.tr.setLocale(locale);
    window.location.reload();
  }

}
