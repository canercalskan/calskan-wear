import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from "src/app/models/item.model";
import { Ticket } from "src/app/models/ticket.model";
import { OrderModel } from "src/app/models/order.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from "sweetalert2";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    cartItems! : Item[];
    cartTotal : number = +localStorage.getItem('cartTotal')!;
    cartKey! : string
    constructor(private http: HttpClient , private db : AngularFireDatabase , private fireAuth : AngularFireAuth){
        this.cartKey = localStorage.getItem('cartKey')!
        this.db.list<Item>("/carts/" + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(items => {
            this.cartItems = items;
            if(this.cartItems == null ||this.cartItems == undefined) {
                this.cartItems = []
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
            this.cartItems.push(item);
            this.cartKey = this.db.list('carts').push(this.cartItems).key!;
            localStorage.setItem('cartKey' , this.cartKey!);
            location.reload()
            return;
        }
    
        this.cartItems.forEach(i => {
            if(i.key == item.key && i.selectedSize == item.selectedSize) {
                i.quantity++;
                this.db.list('carts').update(cartKey! , this.cartItems)
                done = true;
                Swal.fire('Başarılı', 'Var olan ürün güncellendi' , 'success').then(() => {
                    location.reload()
                    return;
                })
            }
          })
            if(!done) {
                this.cartItems.push(item);
                this.db.list('carts').update(cartKey! , this.cartItems);
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    location.reload();
                    return;
                })
            }
        } 

    removeFromCart(item:Item) : void { 
        let cartKey = localStorage.getItem('cartKey')!;
        this.cartItems = this.cartItems.filter(items => items != item) 

        if(this.cartItems.length == 0) {
            localStorage.removeItem(cartKey);
        }
        this.db.list('carts').set(cartKey , this.cartItems).then((r)=>console.log(r));
    }

    getCartItems() : Item[] {
        return this.cartItems
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
            console.log(order)
            this.db.list('orders').push(order).then(() => {
                this.cartTotal = 0;
                this.cartItems = [];
                this.db.list('carts').remove(this.cartKey).then(() => {
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