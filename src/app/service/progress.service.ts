import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private loading = new BehaviorSubject(false);

  setLoadingState(loading: boolean) {
    this.loading.next(loading);
  }

  getLoadingState() {
    return this.loading.pipe(distinctUntilChanged());
  }

}
