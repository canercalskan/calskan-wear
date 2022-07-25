import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from "src/app/models/item.model";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    cartItems : Item[] = [];
    constructor(private http: HttpClient , private db : AngularFireDatabase){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>(environment.dbUsers , user)
    }
    contact(form : object) : void {
         this.db.list('contacts').push(form)
    }
    addToCart(item:Item) {
        // if(this.cartItems.find(i => i.key == item.key)) {
        //     alert('Ürün zaten sepete eklendi')
        //     return;
        // }
         this.cartItems.push(item)
    }
    removeFromCart(item:Item) : void {
        this.cartItems = this.cartItems.filter(items => items.key != item.key)
    }

    getCartItems() : Item[] {
        return this.cartItems
    }

}