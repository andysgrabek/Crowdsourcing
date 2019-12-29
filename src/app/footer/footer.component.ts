import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  rb: TranslationBundle;
  logoUniversityUrl: Observable<string>;
  logoInstituteUrl: Observable<string>;

  constructor(public tr: TranslationService, private storage: AngularFireStorage) {
    this.rb = tr.getComponentBundle('FooterComponent');
  }

  ngOnInit() {
    this.logoUniversityUrl = this.storage.ref('assets/images/footer/logo-pl.png').getDownloadURL();
    this.logoInstituteUrl = this.storage.ref('assets/images/footer/logo-iis.png').getDownloadURL();
  }

  async setLocale(locale: string) {
    this.tr.setLocale(locale);
    window.location.reload();
  }

}
