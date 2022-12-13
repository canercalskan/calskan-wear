import { Injectable, NgModule, OnInit } from "@angular/core";
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
    lastSeenProducts : Item[]
    lastSeenProductsDetails : Item[] = []
    months : string[] = ["Ocak" , "Şubat" , "Mart" , "Nisan" , "Mayıs" , "Haziran" , "Temmuz" , "Ağustos" , "Eylül" , "Ekim", "Kasım" , "Aralık"]
    cartItems! : Item[]
    cartTotal : number = 0;
    cartKey! : string;
    cart : Cart = {items : [] , offer : new Offer , total : 0} 
    cargo : number = 12.99;
    offerFound! : boolean;
    activatedOffer! : Offer
    myAddressesClicked : boolean = false;
    currentUser! : User
    constructor(private db : AngularFireDatabase , private fireAuth : AngularFireAuth){
        this.cartKey = localStorage.getItem('cartKey')!
        this.db.object<Cart>("carts/" + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(cart => {
            this.cart = cart!;
            if(this.cart == null || this.cart == undefined) {
                this.cart = {items:[] , offer : {code : '' , rate : 0, key : '' , hidden : false} , total : 0}
            }
         })
         this.lastSeenProducts = JSON.parse(localStorage.getItem('lastSeenProducts')!)
         if(this.lastSeenProducts == null || this.lastSeenProducts == undefined) {
            this.lastSeenProducts = []
         }
         this.getCurrentUser()
    }

    registerUser(user : User): void {
        this.db.list('users').push(user).then((r) => {
            user.key = r.key!
            this.db.list('users/').update(user.key , user);
        });
    }

    contact(form : Ticket) {
        this.db.list('contacts').push(form)
    }

    addToCart(item:Item) {
        let done = false;
        let cartKey = localStorage.getItem('cartKey');
        if(cartKey == null || cartKey == undefined) {
            this.cart.items.push(item)
            this.cart.total += item.price;
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
                this.cart.total += item.price;
                this.db.list('carts').update(cartKey! , this.cart)
                done = true;
                Swal.fire('Başarılı', 'Var olan ürün güncellendi' , 'success').then(() => {
                    location.reload();
                    return;
                }) 
            }
          })
            if(!done) {
                this.cart.total += item.price;
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
        if(this.cart.items.length == 0 || this.cart.items == undefined || this.cart.items == null) {
            localStorage.removeItem('cartKey');
            localStorage.removeItem('activeOffer');
            this.db.list('carts').remove(cartKey);
        }
        else {
            this.db.list('carts').set(cartKey , this.cart)
        }  
    }

    getCart() : Cart {
        return this.cart;
    }

    getCartItems() : Item[] {
        return this.cart.items!
    }

    getCartTotal() : number {
        return this.cart.total;
    }

    setOffer(code : Offer) : Observable<Offer[]> {
        return this.db.list<Offer>('offers').valueChanges()
    }

    getOffer() : Offer {
        return this.activatedOffer
    }

    getCurrentUser() : void {
        this.fireAuth.user.subscribe(r => {
            this.db.list<User>('users').valueChanges().subscribe(response => {
                response.forEach(user => {
                    if(r?.uid === user.uid) {
                        this.currentUser = user
                    }
                })
            })
        })
    }

    pay(cart : Cart) : void {
        let date = new Date();
        let order = new OrderModel();
        order.items = cart.items;
        order.total = cart.total;
        order.offer = cart.offer;
        order.date = date.getUTCDate().toString() + ' ' + this.months[date.getUTCMonth()]+ ' '+ date.getUTCFullYear().toString()+ ' - ' + date.getHours().toString() +':' + date.getUTCMinutes().toString()

        this.fireAuth.currentUser.then(u => { 
            if(u!.displayName) {
                order.user = u!.uid;
            }
            else {
                order.user = 'Anonymous';
            }
            this.db.list('orders').push(order).then(() => {
                this.cart.total = 0;
                this.cart.items = [];
                this.cart.offer = {code : '' , rate : 0, key : '' , hidden : false};
                this.db.list('carts').remove(this.cartKey).then(() => {
                    localStorage.removeItem('activeOffer')
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

    showMyAddresses(value : boolean) : void {
        this.myAddressesClicked = value;
    }

    getMyAddresses() : boolean {
        return this.myAddressesClicked;
    }

    pushLastSeenProducts(product : Item) : void {
        if(this.lastSeenProducts.length === 0) {
            this.lastSeenProducts.push(product)
            localStorage.setItem('lastSeenProducts' , JSON.stringify(this.lastSeenProducts))
            console.log(this.lastSeenProducts)
        }
        else {
            if(this.lastSeenProducts.find(i => product == i) == undefined) {
                this.lastSeenProducts.push(product)
                localStorage.setItem('lastSeenProducts' , JSON.stringify(this.lastSeenProducts))
                console.log(this.lastSeenProducts)
            }
            else {
                return;
            }
        }
    }

    getLastSeenProducts() : Item[] {
        return this.lastSeenProducts;
    }
}