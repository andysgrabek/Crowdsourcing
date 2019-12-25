import {Injectable, isDevMode} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {ProgressService} from './progress.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private readonly currentLocaleCookieName = 'currentLocale';
  availableLocales = ['en-US', 'pl-PL'];
  currentLocale; // default and only one available locale for now

  constructor(private db: AngularFireDatabase,
              private cookieService: CookieService,
              private progressService: ProgressService) {
    if (cookieService.check(this.currentLocaleCookieName)) {
      this.currentLocale = cookieService.get(this.currentLocaleCookieName);
    } else {
      this.currentLocale = this.availableLocales[0];
      this.cookieService.set(this.currentLocaleCookieName, this.currentLocale);
    }
  }

  setLocale(locale: string) {
    this.currentLocale = locale;
    this.cookieService.delete(this.currentLocaleCookieName);
    this.cookieService.set(this.currentLocaleCookieName, locale);
  }

  getBundle(key: string): TranslationBundle {
    const translationPath = 'translation/' + this.currentLocale + '/' + key;
    const observable = this.db.object(translationPath).valueChanges();
    return new ObservableTranslationBundle(observable, translationPath);
  }

  getComponentBundle(componentClassName: string): TranslationBundle {
    return this.getBundle('component/' + componentClassName);
  }

  getServiceBundle(serviceName: string): TranslationBundle {
    return this.getBundle('service/' + serviceName);
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
      : (isDevMode() ? 'tr:' + key : '');
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
