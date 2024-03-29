import { Component, OnInit } from "@angular/core";
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
import { AccountComponent } from "src/app/components/user/account/account.component";
import { HttpClient } from "@angular/common/http";
@Component({
    selector:'ng-navbar',
    styleUrls : ['./user-navbar.component.css'],
    templateUrl : './user-navbar.component.html'
})
export class Navbar implements OnInit{
    userName! : string;
    user! : firebase.default.User;
    collapseShown : boolean = false;
    itemQuantity : number = 1;
    loginComp = new LoginComponent(this.router, this.AuthService)
    noMobile = true;
    productsComp! : ProductsComponent;
    f!  : File;
    cartTotal : number = this.UserService.cartTotal;
    showOffer! : boolean;
    rate! : number
    cart! : Cart; 
    mazigxng : boolean = false;
    constructor(private router : Router , private AuthService : AuthService , private fireAuth : AngularFireAuth , private UserService : UserService , private db : AngularFireDatabase , private http : HttpClient){
        if(window.screen.width < 900) {
            this.noMobile = false;
        }
        this.fireAuth.user.subscribe(u => {
            if(u) {
             this.userName = u!.displayName!
             this.user = u!;
            }
        })
        this.UserService.getCart().then(response => {
            this.cart = response
        })
    }
    ngOnInit(): void {
        this.UserService.getCart().then(response => {
            this.cart = response
        })
    }
    
    logout() : void {
        this.fireAuth.signOut().then(() => {
            location.reload();
        })
    }
    googleLogin() : void{
        this.loginComp.handleGoogleLogin();
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
        this.fireAuth.currentUser.then(user => {
            if(!user) {
                this.router.navigate(['Checkout/AnonymousPay'])

            }
            else {
                this.UserService.pay(this.cart)
                Swal.fire('Sipariş Verildi!' , 'Ürünleriniz hazırlanmaya başladı, siparişiniz için teşekkürler.' , 'success')   
            }
        })
    }

    setOffer(code : Offer) : void {
        // cart model'e offer attribute ekle, localstorage yapısından çıkart.
        if(localStorage.getItem('activeOffer')) {
            Swal.fire('' , 'Zaten bir kupon kullandınız' , 'warning').then(() => {
                return;
            })
        }
        else {
            this.UserService.setOffer(code).subscribe(response => {
                response.forEach(a => {
                    if(a.code === code.code && a.code != "MAZIGXNG50") {
                        this.showOffer = true;
                        this.rate = a.rate;
                        this.UserService.cart!.total -= (this.cartTotal * a.rate) / 100;
                        this.UserService.cart!.offer = a;
                        this.db.list('carts/' ).set(this.UserService.cartKey, this.UserService.cart)
                        localStorage.setItem('activeOffer' , JSON.stringify(a))
                        return;
                    }
                    else if(code.code === a.code && code.code === "MAZIGXNG50") {
                        this.showOffer = true;
                        this.mazigxng = true;
                        this.rate = a.rate;
                        this.UserService.cart!.total -= (this.cartTotal * a.rate) / 100;
                        this.UserService.cart!.offer = a;
                        this.db.list('carts/' ).set(this.UserService.cartKey, this.UserService.cart)
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
    navigateToOrders() : void {
        let account = new AccountComponent(this.fireAuth, this.UserService, this.db , this.router , this.http)
        account.myOrdersClicked;
    }
}