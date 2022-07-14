import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Router } from "@angular/router";

@NgModule()
export class AuthGuard implements CanActivate {
    constructor(private router : Router){}
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