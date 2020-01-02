import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ResearchResultService} from '../service/research-result.service';
import {ActivatedRoute} from '@angular/router';
import {TranslationBundle, TranslationService} from '../service/translation.service';
import {TransformationService} from '../service/transformation.service';
import TransformationDescriptor from '../dto/TransformationDescriptor';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressService} from '../service/progress.service';

@Component({
  selector: 'app-research-data',
  templateUrl: './research-data.component.html',
  styleUrls: ['./research-data.component.css']
})
export class ResearchDataComponent implements OnInit {

  researchData: Observable<any>;
  private id: string;
  rb: TranslationBundle;
  availableTransformations: Observable<TransformationDescriptor[]>;
  selectedTransform: TransformationDescriptor;
  dataString: string;
  fb: TranslationBundle;

  constructor(private resultService: ResearchResultService,
              private route: ActivatedRoute,
              private tr: TranslationService,
              private transformationService: TransformationService,
              private matSnackBar: MatSnackBar,
              private http: HttpClient,
              private storage: AngularFireStorage,
              private progressService: ProgressService) {
    this.rb = tr.getComponentBundle('ResearchDataComponent');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.researchData = this.resultService.getAllResultsById(this.id).pipe(tap(res => this.dataString = JSON.stringify(res)));
    this.availableTransformations = this.transformationService.getAvailableTransformations().pipe(tap(res => {
      if (res && res.length > 0) {
        this.selectedTransform = res[0];
      }
    }));
    this.fb = this.tr.getFunctionsBundle();
  }

  async onDownloadTransformed(transform: TransformationDescriptor) {
    this.progressService.setLoadingState(true);
    try {
      const result = await this.transformationService.invokeTransformation(transform.name, this.id);
      const ref = this.storage.ref(`results/${this.id}/${this.id}-${transform.name}.${transform.extension || 'data'}`);
      const task = await ref.putString(result);
      const url = await task.ref.getDownloadURL();
      window.open(url);
      this.matSnackBar.open(this.rb.get('downloading-file-success'), undefined, {duration: 3000});
    } catch {
      this.matSnackBar.open(this.rb.get('downloading-file-failure'), undefined, {duration: 3000});
    } finally {
      this.progressService.setLoadingState(false);
    }
  }
}
