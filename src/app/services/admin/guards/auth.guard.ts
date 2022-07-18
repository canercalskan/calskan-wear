import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

import { Router } from "@angular/router";
@NgModule()

export class AdminAuthGuard implements CanActivate {
    constructor(private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if(!localStorage.getItem('admin')) {
            this.router.navigate(['AdminPaneLogin'])
            return false
        }
        else if(localStorage.getItem('admin') == 'admin@calskan.com' || localStorage.getItem('admin') == 'caner@calskan.com'){
            return true
        }
        else {
            this.router.navigate(['AdminPaneLogin'])
            return false;
        }
    }
}

@NgModule()
export class AdminLoginGuard implements CanActivate {
    constructor(private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if(!localStorage.getItem('admin')) {
            return true;
        }
        else {
            this.router.navigate(['Administration'])
            return false;
        }
    }
}