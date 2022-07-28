import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
@Component({
    styleUrls: ['./footer.component.css'],
    templateUrl: './footer.component.html',
    selector : 'footer'
})

export class Footer implements OnInit{
    subscribed : boolean = false;
    cartItems : Array<Item> = [];
    constructor(private db : AngularFireDatabase , private UserService : UserService) {}
    ngOnInit(): void {
       this.cartItems = this.UserService.getCartItems()
    }
    loginStatus() : boolean{
        if(localStorage.getItem('isLoggedIn') == 'true') {
            return true;
        }
        else {
            return false;
        }
    }
    handleSubscribe(mail : string) : void {
        this.db.list('subscribers').push(mail);
        this.subscribed = true;
    }

    showCart() : void {
        let cart = document.getElementById('cart-dropdown')!;
        let container = document.getElementById('content')
        cart.style.right = '0';
    }
}