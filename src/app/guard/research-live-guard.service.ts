import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ResearchConfigService} from '../service/research-config.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchLiveGuardService implements CanActivate {

  constructor(private researchConfigService: ResearchConfigService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.researchConfigService
      .getByIdUnauthenticated(route.paramMap.get('userId'), route.paramMap.get('researchId'))
      .pipe(map(obj => obj.isLive));
  }
}
