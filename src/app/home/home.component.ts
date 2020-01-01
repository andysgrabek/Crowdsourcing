import { Component, OnInit } from '@angular/core';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rb: TranslationBundle;
  featureOneUrl: Observable<any>;
  featureTwoUrl: Observable<any>;

  constructor(private tr: TranslationService,
              private storage: AngularFireStorage) {
    this.rb = tr.getComponentBundle('HomeComponent');
  }

  ngOnInit() {
    this.featureOneUrl = this.storage.ref('assets/images/home/feature1.png').getDownloadURL();
    this.featureTwoUrl = this.storage.ref('assets/images/home/feature2.png').getDownloadURL();
  }

}
