import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from "src/app/models/item.model";
import { Ticket } from "src/app/models/ticket.model";
import { OrderModel } from "src/app/models/order.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from "sweetalert2";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    cartItems : Item[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartTotal : number = +localStorage.getItem('cartTotal')!;
    constructor(private http: HttpClient , private db : AngularFireDatabase , private fireAuth : AngularFireAuth){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>(environment.dbUsers , user)
    }
    contact(form : Ticket) {
        this.db.list('contacts').push(form);
    }

    addToCart(item:Item) {
        let done = false;
        this.cartItems.forEach(i => {
            if(i.key == item.key && i.selectedSize == item.selectedSize) {
                i.quantity++;
                this.cartTotal+=item.price;
                localStorage.setItem('cartTotal' , this.cartTotal.toString())
                localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                done = true;
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    location.reload();
                    return;
                })
            }
        })
        if(!done) {
            this.cartTotal += item.price
            this.cartItems.push(item);
            localStorage.setItem('cartTotal' , this.cartTotal.toString())
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                location.reload();
            })
        }
    }

    removeFromCart(item:Item) : void { 
        this.cartItems = this.cartItems.filter(items => items != item) 
        this.cartTotal -= item.price * item.quantity
        localStorage.setItem('cartItems' , JSON.stringify(this.cartItems));
        localStorage.setItem('cartTotal' , this.cartTotal.toString());
    }

    getCartItems() : Item[] {
        return this.cartItems
    }

    pay(items : Item[] , amount : number) : void {
        console.log(this.fireAuth.currentUser)
        let order = new OrderModel();
        order.items = items;
        order.total = amount;
        this.fireAuth.user.subscribe(u => {
            if(u?.displayName != null) {
                order.user = u?.displayName + ' : ' + u?.email ;
                this.db.list('orders').push(order);
                this.cartTotal = 0;
                this.cartItems = [];
                return
            }
            else {
                order.user = 'Anonymous'
                this.db.list('orders').push(order);
                this.cartTotal = 0;
                this.cartItems = [];
                return
            }
        })
    }

    verifyEmail() : void {
        this.fireAuth.user.subscribe(currentUser => {
            if(!(currentUser?.emailVerified)) {
                // currentUser?.sendEmailVerification();
                 currentUser?.sendEmailVerification();
                 Swal.fire('Hesap doğrulama', 'Hesabınızı doğrulamak için gereken adımlar mailinize iletilmiştir.' ,'info')
            }
            else return;
        })
    }
}