import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
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
@NgModule()
export class UserLoginGuard implements CanActivate {
    constructor(private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(localStorage.getItem('isLoggedIn') == 'true') {
            this.router.navigate(['Account']);
            return false;
        }   
        else {
            return true;
        }
    }
}

@NgModule()
export class CheckoutGuard implements CanActivate {
    constructor(private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(localStorage.getItem('cartItems') && localStorage.getItem('cartItems')?.length! > 0 && +localStorage.getItem('cartTotal')! > 0) {
            return true
        }
        else {
            this.router.navigate(['Home'])
            return false;
        }
    }
}