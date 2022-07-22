import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/user/auth/auth.service";
import { LoginComponent } from 'src/app/components/user/login/login.component'
import { Item } from "src/app/models/item.model";
import { AngularFireAuth } from "@angular/fire/compat/auth"; 

@Component({
    selector:'ng-navbar',
    styleUrls : ['./navbar.css'],
    templateUrl : './navbar.html'
})
export class Navbar {
    userName! : string
    loginComp = new LoginComponent(this.router, this.AuthService)
    constructor(private router : Router , private AuthService : AuthService , private fireAuth : AngularFireAuth){
        this.fireAuth.user.subscribe(u => {
            this.userName = u?.displayName!
        })
    }
    cartItems : Array<Item> = [];
    loginStatus () {
        if(localStorage.getItem('isLoggedIn') == 'true') {
            return true
        }
        else {return false};
    }
    
    logout():void {
        localStorage.removeItem('isLoggedIn')
        this.router.navigate([this.router.url]);
    }
    googleLogin():void{
        this.loginComp.handleGoogleLogin()
    }
}