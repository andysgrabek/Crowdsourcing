import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {ResearchConfigService} from '../service/research-config.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchLiveGuardService implements CanActivate {

  constructor(private researchConfigService: ResearchConfigService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const researchId = route.paramMap.get('researchId');
    const userId = route.paramMap.get('userId');
    if (!userId) {
      this.router.navigateByUrl('');
      return false;
    }
    if (!researchId) {
      this.router.navigateByUrl('');
      return false;
    }
    return this.researchConfigService
      .getByIdUnauthenticated(userId, researchId)
      .pipe(map(obj => {
        if (obj && obj.isLive) {
          return true;
        } else {
          this.router.navigateByUrl('');
          return false;
        }
      }));
  }
}
