import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable , map} from "rxjs";
@NgModule()
export class UserAuthGuard implements CanActivate {
    constructor(private router : Router , private fireAuth : AngularFireAuth){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuth();
    }

    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response) {
                return true;
            }
            else {
                this.router.navigate(['./giris'])
                return false;
            }
        }))
    }
}
@NgModule()
export class UserLoginGuard implements CanActivate {
    constructor(private router : Router , private fireAuth : AngularFireAuth){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.checkAuth()
    }
    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response) {
                this.router.navigate(['./hesabim'])
                return false;
            }
            else {
                return true;
            }
        }))
    }
}

@NgModule()
export class CheckoutGuard implements CanActivate {
    constructor(private router : Router , private db : AngularFireDatabase ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let cartKey = localStorage.getItem('cartKey');
        if(this.db.list('/carts/' + cartKey) !== null || this.db.list('/carts/'+ cartKey) !== undefined) {
            return true;
        }
        else {
            this.router.navigate(['Home'])
            return false;
        }
    }
}