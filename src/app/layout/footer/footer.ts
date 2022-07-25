import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
    styleUrls: ['./footer.css'],
    templateUrl: './footer.html',
    selector : 'footer'
})

export class Footer {
    constructor(private db : AngularFireDatabase) {}
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
    }

    showCart() : void {
        let cart = document.getElementById('cart-dropdown')!;
        cart.style.right = '0';
    }
}