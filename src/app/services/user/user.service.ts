import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from "src/app/models/item.model";
import { Ticket } from "src/app/models/ticket.model";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    cartItems : Item[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartTotal : number = +localStorage.getItem('cartTotal')!;
    constructor(private http: HttpClient , private db : AngularFireDatabase){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>(environment.dbUsers , user)
    }
    contact(form : Ticket) {
        this.db.list('contacts').push(form);
    }

    addToCart(item:Item) {
        // if(this.cartItems.find(i => i.key == item.key)) {
        //     //item tekrardan sepete eklenmesin, var olan itemin adeti artırılsın.
        //     return;
        // }
        this.cartTotal += item.price;
        this.cartItems.push(item)
        localStorage.setItem('cartTotal' , this.cartTotal.toString())
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }
    removeFromCart(item:Item) : void {
        this.cartItems = this.cartItems.filter(items => items.key != item.key)
        this.cartTotal -= item.price
        localStorage.setItem('cartItems' , JSON.stringify(this.cartItems));
        localStorage.setItem('cartTotal' , this.cartTotal.toString());
    }

    getCartItems() : Item[] {
        return this.cartItems
    }

}