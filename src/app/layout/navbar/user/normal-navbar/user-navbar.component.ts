import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/user/auth/auth.service";
import { LoginComponent } from 'src/app/components/user/login/user-login.component'
import { Item } from "src/app/models/item.model";
import { AngularFireAuth } from "@angular/fire/compat/auth"; 
import { ProductsComponent } from "src/app/components/pages/products/products.component";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { Offer } from "src/app/models/offer.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Cart } from "src/app/models/cart.model";
@Component({
    selector:'ng-navbar',
    styleUrls : ['./user-navbar.component.css'],
    templateUrl : './user-navbar.component.html'
})
export class Navbar {
    userName! : string
    collapseShown : boolean = false;
    itemQuantity : number = 1;
    loginComp = new LoginComponent(this.router, this.AuthService)
    noMobile = true;
    constructor(private router : Router , private AuthService : AuthService , private fireAuth : AngularFireAuth , private UserService : UserService , private db : AngularFireDatabase){
        if(window.screen.width < 900) {
            this.noMobile = false;
        }
        this.fireAuth.user.subscribe(u => {
            this.userName = u?.displayName!
        })
    }
    productsComp! : ProductsComponent;
    f!  : File;
    cartTotal : number = this.UserService.cartTotal;
    cartItems : Array<Item> = this.UserService.cartItems || [];
    showOffer! : boolean;
    rate! : number
    cart : Cart = this.UserService.cart || null

    loginStatus () { 
        this.cartItems = this.UserService.cart.items;
        this.cartTotal = this.UserService.getCartTotal();
        if(this.cartItems == null) {
            this.cartItems = []
        }
        if(localStorage.getItem('isLoggedIn') == 'true') {
            return true
        }
        else {
            return false
        };
    }
    
    logout() : void {
        localStorage.removeItem('isLoggedIn')
        this.fireAuth.signOut()
        this.router.navigate([this.router.url]);
    }
    googleLogin() : void{
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

    MobileShowUserActions() : void {
        let user = document.getElementById('accountDropdown')
        let userMenu = document.getElementById('account-dropdown-menu')!
        user?.addEventListener('click' , () => {
            userMenu.style.display = 'flex'
        })
    }

    checkout() : void {
        this.UserService.pay(this.cart)
        Swal.fire('Sipariş Verildi!' , 'Ürünleriniz hazırlanmaya başladı, siparişiniz için teşekkürler.' , 'success')
    }

    setOffer(code : Offer) : void {
        if(localStorage.getItem('activeOffer')) {
            Swal.fire('' , 'Zaten bir kupon kullandınız' , 'warning').then(() => {
                return;
            })
        }
        else {
            this.UserService.setOffer(code).subscribe(response => {
                response.forEach(a => {
                    if(a.code === code.code) {
                        this.showOffer = true;
                        this.rate = a.rate;
                        this.UserService.cart.total -= (this.cartTotal * a.rate) / 100;
                        this.UserService.cart.offer = a;
                        // this.db.list('carts/' + this.UserService.cartKey + '/offer').valueChanges().subscribe(r => {
                        //     r.push(a)
                        // })
                        this.db.list('carts/' ).set(this.UserService.cartKey, this.UserService.cart)
                        // sessionStorage.setItem('activeOffer' , JSON.stringify(a))
                        localStorage.setItem('activeOffer' , JSON.stringify(a))
                        return;
                    }
                    else {
                        this.showOffer = false;
                    }
                })
            });
        }
        
    }
}