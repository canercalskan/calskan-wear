import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { SwalComponent, SwalDirective } from "@sweetalert2/ngx-sweetalert2";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
@Component({
    styleUrls: ['./footer.component.css'],
    templateUrl: './footer.component.html',
    selector : 'footer'
})

export class Footer implements OnInit{
    subscribed : boolean = false;
    cartItems : Array<Item> = []!;
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
        let mailList : string[]
        let done : boolean = false;
        this.db.list<any>('subscribers').valueChanges().subscribe(r => {
            r.forEach(subscriber => {
                if(subscriber.email === mail) {
                    Swal.fire('Abonelik Mevcut' , 'Bültene zaten abonesiniz' , 'warning').then(() => {
                        return;
                    })
                }
            })
        })
        this.db.list('subscribers').push(mail);
        this.subscribed = true;
    }

    showCart() : void {
        let cart = document.getElementById('cart-dropdown')!;
        cart.style.right = '0';
    }
}