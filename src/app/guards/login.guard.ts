// import { CanActivateFn } from '@angular/router';
// import { LoginService } from '../login/login.service';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Injectable } from '@angular/core';

// export const loginGuard: CanActivateFn = (route, state) => {
//   return LoginService;
// };
@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.loginService.isLoggedIn
      ? true
      : this.router.navigate(['/login']);
  }
}
