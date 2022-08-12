import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from "src/app/models/item.model";
import { Ticket } from "src/app/models/ticket.model";
import { OrderModel } from "src/app/models/order.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from "sweetalert2";
import { Offer } from "src/app/models/offer.model";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart.model";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    cartItems! : Item[]
    cartTotal : number = 0;
    cartKey! : string;
    cart : Cart = {items : [] , offerCode : '' , total : 0} 
    offerFound! : boolean;
    activatedOffer! : Offer
    constructor(private db : AngularFireDatabase , private fireAuth : AngularFireAuth){
        this.cartKey = localStorage.getItem('cartKey')!
        this.db.object<Cart>("carts/" + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(cart => {
            this.cart = cart!;
            if(this.cart == null || this.cart == undefined) {
                this.cart = {items:[] , offerCode : '' , total : 0}
            }
        })
    }

    registerUser(user : User): void {
        this.db.list('users').push(user);
    }

    contact(form : Ticket) {
        this.db.list('contacts').push(form)
    }

    addToCart(item:Item) {
        let done = false;
        let cartKey = localStorage.getItem('cartKey');
        if(cartKey == null || cartKey == undefined) {
            this.cart.items.push(item)
            this.db.list('carts').push(this.cart).then(r => {
                this.cartKey = r.key!
                localStorage.setItem('cartKey' , this.cartKey!);
                Swal.fire('Eklendi' , 'Ürün sepetinize eklendi' , 'success').then(() => {
                    location.reload();
                })
                return;
            })
        }
    
        this.cart.items.forEach(i => {
            if(i.key == item.key && i.selectedSize == item.selectedSize) {
                i.quantity++;
                this.db.list('carts').update(cartKey! , this.cart)
                done = true;
                Swal.fire('Başarılı', 'Var olan ürün güncellendi' , 'success').then(() => {
                    location.reload();
                    return;
                }) 
            }
          })
            if(!done) {
                this.cart.items.push(item);
                this.db.list('carts').update(cartKey! , this.cart);
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    location.reload();
                    return;
                })
            }
        } 

    removeFromCart(item:Item) : void { 
        let cartKey = localStorage.getItem('cartKey')!;
        this.cart.items = this.cart.items.filter(items => items != item) 
        this.cart.total -= item.price * item.quantity;
        if(this.cart.items.length == 0) {
            localStorage.removeItem(cartKey);
        }
        this.db.list('carts').set(cartKey , this.cart).then((r)=>console.log(r)); // testing the results
    }

    getCartItems() : Item[] {
        return this.cart.items!
    }

    getCartTotal() : number {
        return this.cart.total;
    }

    setOffer(code : Offer) : Observable<Offer[]> {
        return this.db.list<Offer>('offers').valueChanges();
    }

    getOffer() : Offer {
        return this.activatedOffer
    }

    pay(items : Item[] , amount : number) : void {
        let order = new OrderModel();
        order.items = items;
        order.total = amount;
        this.fireAuth.user.subscribe(u => { 
            if(u?.displayName) {
                order.user = u.displayName + ' : ' + u?.email;
            }
            else {
                order.user = 'Anonymous';
            }
            this.db.list('orders').push(order).then(() => {
                this.cart.total = 0;
                this.cart.items = [];
                this.cart.offerCode = '';
                this.db.list('carts').remove(this.cartKey).then(() => {
                    sessionStorage.removeItem('activeOffer')
                    localStorage.removeItem('cartKey')
                })
            })
        })
    }

    verifyEmail() : void {
        this.fireAuth.user.subscribe(currentUser => {
            if(!(currentUser?.emailVerified)) {
                 currentUser?.sendEmailVerification();
                 Swal.fire('Hesap doğrulama', 'Hesabınızı doğrulamak için gereken adımlar mailinize iletilmiştir.' ,'info')
            }
            else 
                return;
        })
    }
}