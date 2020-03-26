import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
isValid = false;
  constructor(
    private router: Router
  ) {
     
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (route.paramMap.get('id')){
      this.isValid = true
    }else{
      this.router.navigateByUrl("/usuarios")
    }
    return this.isValid
    }
}
