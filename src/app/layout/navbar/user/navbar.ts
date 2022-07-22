import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/user/auth/auth.service";
import { LoginComponent } from 'src/app/components/user/login/login.component'
import { Item } from "src/app/models/item.model";
import { AngularFireAuth } from "@angular/fire/compat/auth"; 
import { ProductsComponent } from "src/app/components/pages/products/products.component";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector:'ng-navbar',
    styleUrls : ['./navbar.css'],
    templateUrl : './navbar.html'
})
export class Navbar {
    userName! : string
    loginComp = new LoginComponent(this.router, this.AuthService)
    constructor(private router : Router , private AuthService : AuthService , private fireAuth : AngularFireAuth , private UserService : UserService){
        this.fireAuth.user.subscribe(u => {
            this.userName = u?.displayName!
        })
    }
    productsComp! : ProductsComponent;
    cartItems : Array<Item> = [];
    loginStatus () {
        this.cartItems = this.UserService.getCartItems();
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