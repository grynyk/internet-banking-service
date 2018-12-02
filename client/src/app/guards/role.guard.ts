import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()

export class RoleGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loginRespond = JSON.parse(localStorage.getItem('currentUser'));
    const user = {
      admin: loginRespond.userData.admin
    }

    const isAdmin = route.data.isAdmin || false;

    if (!localStorage.getItem('currentUser') || user.admin !== isAdmin) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}