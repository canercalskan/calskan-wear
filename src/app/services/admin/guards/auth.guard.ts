import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AdminService } from "../admin.service";
import { User } from "@firebase/auth";
@NgModule()

export class AdminAuthGuard implements CanActivate {
    currentUser! : User;
    constructor(private router : Router , private fireAuth : AngularFireAuth , private AdminService : AdminService){
        // this.fireAuth.currentUser.then(u => {
        //     console.log(u)
        // })
        // this.currentUser = this.fireAuth.currentUser;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean  {
        let returnVal : boolean = false;
        // let returnValue : boolean;
        // if(this.currentUser.uid === "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
        //     return true;
        // }
        // else if(this.currentUser.uid !== "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
        //     console.log(this.currentUser.uid)
        //     this.router.navigate(['AdminPaneLogin']);
        //     return false
        // }
        // else {
        //     console.log(this.currentUser.uid)
        //     return false
        // }
        // if(this.currentUser != null) {
        //     this.fireAuth.user.subscribe(u => {
        //         if(u!.uid === "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
        //             this.returnVal = true
        //          return true;
        //         }
        //         else if(u!.uid !== "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
        //             this.returnVal = false
        //             this.router.navigate(['AdminPaneLogin']);
        //             return false
        //         }
        //         else {
        //             this.returnVal = false;
        //             return false
        //         }
        //     })
        //     return true;
        // }
    //     if(this.AdminService.getAdmin().uid! === "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
    //         alert('ADMİN GİRİŞİ ONAYLANDI');
    //         return true;
    //     }
    //     else {
    //         alert('ADMİN GİRİŞİ REDDEDİLDİ');
    //         this.router.navigate(['AdminPaneLogin'])
    //         return false;
    //     }
    // }
    this.fireAuth.currentUser.then(u=> {
        if(u?.uid === "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
            alert(u.uid)
            returnVal = true;
        }
        else {
            this.router.navigate(['AdminPaneLogin'])
            returnVal = false;
        }
    })
    
    return true; //will be changed.
}

//     if(this.currentUser == null) {
//         alert('yanlış admin')
//         this.router.navigate(['AdminPaneLogin'])
//         return false;
//     }
//     else if(this.currentUser.uid === "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
//         alert('doğru admin')
//         return true;
//     }
//     else {
//         alert('bilinmezlik')
//         return false;
//     }
//   }
}

@NgModule()
export class AdminLoginGuard implements CanActivate {
    currentUser! : any;
    constructor(private router : Router, private fireAuth : AngularFireAuth , private AdminService : AdminService){
        this.currentUser = this.AdminService.getAdmin()
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        if(this.currentUser == null) {
            return true;
        }
        else {
            this.router.navigate(['Administration'])
            return false;
        }
        // this.fireAuth.user.subscribe(u => {
        //     if(u?.uid !== "rVVKy4U8jfgjJl8iFxdJmVqsP982") {
        //         return true;
        //     }
        //     else {
        //         this.router.navigate(['Administration']);
        //         return false;
        //     }
        // })
    }
}