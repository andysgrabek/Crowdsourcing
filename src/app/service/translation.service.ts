import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private locale = 'en-US'; // default and only one available locale for now

  constructor(private db: AngularFireDatabase) {

  }

  getBundle(key: string): TranslationBundle {
    const translationPath = 'translation/' + this.locale + '/' + key;
    const observable = this.db.object(translationPath).valueChanges();
    return new ObservableTranslationBundle(observable, translationPath);
  }

}

export interface TranslationBundle {
  getTranslationPath(): string;
  getBundle(key: string): TranslationBundle;
  get(key: string): string;
}

abstract class AbstractTranslationBundle implements TranslationBundle {
  protected obj: object = {};
  private readonly translationPath: string;

  protected constructor(translationPath: string) {
    this.translationPath = translationPath;
  }

  get(key: string): string {
    return (this.obj && this.obj.hasOwnProperty(key) && (typeof this.obj[key] === 'string' || this.obj[key] instanceof String))
      ? this.obj[key]
      : this.translationPath;
  }

  getBundle(key: string): TranslationBundle {
    return new ObjectTranslationBundle(this.obj, this.translationPath);
  }

  getTranslationPath(): string {
    return this.translationPath;
  }

}

class ObjectTranslationBundle extends AbstractTranslationBundle {

  constructor(obj: object, translationPath: string) {
    super(translationPath);
    this.obj = obj;
  }

}

class ObservableTranslationBundle extends AbstractTranslationBundle {

  constructor(observable: Observable<unknown>, translationPath: string) {
    super(translationPath);
    observable.subscribe(obs => this.obj = obs as object);
  }

}
