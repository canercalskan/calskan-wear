import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AdminService } from "../admin.service";
import { User } from "@firebase/auth";
import { Observable , map} from "rxjs";
import Swal from "sweetalert2";
@NgModule()

export class AdminAuthGuard implements CanActivate {
    currentUser! : User;
    constructor(private router : Router , private fireAuth : AngularFireAuth , private AdminService : AdminService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>  {
        return this.checkAuth();
    }

    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response && response.uid === 'bjCeMVcY8cRuojmTaVWMk8liOtz2') {
                return true;
            }
            else {
                Swal.fire("Error" , "Access Denied" , "error").then(() => {
                    this.router.navigate([''])
                })
                return false;
            }
        }))
    }
}

@NgModule()
export class AdminLoginGuard implements CanActivate {
    constructor(private router : Router, private fireAuth : AngularFireAuth , private AdminService : AdminService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.checkAuth();
    }

    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response && response.uid === 'bjCeMVcY8cRuojmTaVWMk8liOtz2') {
                this.router.navigate(['./Administration']);
                return false;
            }
            else {
                return true;
            }
        }))
    }

}