import { Component, OnInit } from "@angular/core";
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
    collapseShown : boolean = false;
    itemQuantity : number = 1;
    loginComp = new LoginComponent(this.router, this.AuthService)
    constructor(private router : Router , private AuthService : AuthService , private fireAuth : AngularFireAuth , private UserService : UserService){
        this.fireAuth.user.subscribe(u => {
            this.userName = u?.displayName!
        })
    }
    productsComp! : ProductsComponent;
    f!  : File
    cartTotal : number = this.UserService.cartTotal;
    cartItems : Array<Item> = this.UserService.cartItems || [];
    loginStatus () { 
        this.cartItems = this.UserService.getCartItems();
        this.cartTotal = +localStorage.getItem('cartTotal')!
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

    showCart() : void {
        let cart = document.getElementById('cart-dropdown')!;
        cart.style.right = '0';
    }

    hideCart() : void{
        let cart = document.getElementById('cart-dropdown')!;
        cart.style.right = '-18rem'
    }
    showCollapse() : void {
        let collapse = document.getElementById('navbarNav')!;
        if(!this.collapseShown) {
            collapse.style.display = 'block';
            this.collapseShown = true;
        }
        else if(this.collapseShown) {
            collapse.style.display = 'none';
            this.collapseShown = false;
        }
    }
    removeItem(item:Item) : void {
        this.UserService.removeFromCart(item);
    }
}