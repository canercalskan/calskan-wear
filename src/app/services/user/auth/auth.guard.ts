import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
@NgModule()
export class UserAuthGuard implements CanActivate {
    constructor(private router : Router , private fireAuth : AngularFireAuth){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(localStorage.getItem('isLoggedIn') == 'true') {
            return true
        }
        else {
            this.router.navigate(['Login'])
            return false;
        }
    }
}