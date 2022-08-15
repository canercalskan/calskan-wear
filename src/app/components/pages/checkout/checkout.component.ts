import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Offer } from "src/app/models/offer.model";
import { Cart } from "src/app/models/cart.model";


@Component({
    styleUrls : ['./checkout.component.css'],
    templateUrl : './checkout.component.html',
    selector : 'checkout'
})

export class CheckoutComponent{
    cartItems! : Item[];
    items! : Item[];
    total : number = 0;
    activatedOffer! : Offer
    cart! : Cart

    constructor(private UserService : UserService , private router : Router , private route : ActivatedRoute , private db : AngularFireDatabase){
        this.cart = this.UserService.getCart();
        this.activatedOffer = this.cart.offer;
        if(this.cart.items.length == 0){
            this.router.navigate(['../']);
        }
    }

    pay() : void {
        this.UserService.pay(this.cart);
        Swal.fire('Sipariş Oluşturuldu', 'Ürünleriniz hazırlanmaya başladı, siparişiniz için teşekkür ederiz.' , 'success').then(() => {
            localStorage.removeItem('activeOffer');
            localStorage.removeItem('cartKey');
            this.router.navigate(['Home'])
        })
    }

    increase(item : Item) : void {
       this.cart.items.forEach(i => {
            if(i.key === item.key && i.selectedSize === item.selectedSize) {  
                i.quantity++;
                this.cart.total += i.price - (i.price * this.cart.offer.rate / 100);
                this.db.list('/carts/').update(localStorage.getItem('cartKey')?.toString()! , this.cart);
            
            }
        })
    }

    decrease(item : Item) : void {
        if(item.quantity <= 1) {
           this.cart.items =  this.cart.items.filter(i => i!= item);
           this.cart.total -= item.price - (item.price * this.cart.offer.rate / 100);
           this.db.list('/carts/').update(localStorage.getItem('cartKey')!, this.cart);
        }

        else {
            item.quantity--;
            this.cart.total -= item.price - (item.price * this.cart.offer.rate / 100);
            for(var i in this.cart.items) {
                if(this.cart.items[i].quantity > 0 && this.cart.items[i].key === item.key && this.cart.items[i].selectedSize === item.selectedSize) {
                    this.cart.items[i].quantity = item.quantity;
                    this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
                    break;
                }
                else if(this.cart.items[i].quantity <= 0 && this.cart.items[i].key === item.key) {
                    this.cart.items = this.cart.items.filter(j => j!= this.cart.items[i]);
                    this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
                    break;
                }
            }      
        }

        if(this.cart.items.length === 0 || this.cart.total === 0) {
            this.db.list('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
            localStorage.removeItem('cartKey')
            location.reload();
        }
    }
}
    