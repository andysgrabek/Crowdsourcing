import { Injectable } from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProgressService} from './progress.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import TransformationDescriptor from '../dto/TransformationDescriptor';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TransformationService {

  constructor(private functionService: AngularFireFunctions,
              private database: AngularFireDatabase,
              private progressService: ProgressService,
              private userService: UserService) {
  }

  getAvailableTransformations(): Observable<TransformationDescriptor[]> {
    this.progressService.setLoadingState(true);
    const obs = this.database.object('transformation').valueChanges() as Observable<TransformationDescriptor[]>;
    return obs.pipe(tap(() => this.progressService.setLoadingState(false)));
  }

  invokeTransformation(name: string, researchId: string): Promise<string> {
    const res = this.functionService.httpsCallable(`${name}`)({userId: this.userService.getCurrentUser().uid, researchId});
    return res.toPromise();
  }

}
