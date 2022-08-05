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
        if(cartKey == null || cartKey == undefined) {
            // if(this.cartItems.length == 0) {
                this.cartItems.push(item);
                this.cartKey = this.db.list('carts').push(this.cartItems).key!;
                localStorage.setItem('cartKey' , this.cartKey!);
                return;
            //} 
        }
    
            this.cartItems.forEach(i => {
                if(i.key == item.key && i.selectedSize == item.selectedSize) {
                    //i.quantity++;
                    //this.cartTotal+=item.price;
                    // this.db.list('/carts/' + this.cartKey).push(this.cartTotal).toString();
                    // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                    // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                    // this.cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
                    // localStorage.setItem('cartKey' , this.cartKey);
                    //item.quantity++
                    //this.db.list('/carts/' + cartKey).update(item.key,item)
                    //this.db.list('/carts/' + cartKey).set(item.key,item)
                    i.quantity++;
                    this.db.list('carts').update(cartKey! , this.cartItems)
                    done = true;
                    Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                        //  location.reload();
                    })
                }
            })
            if(!done) {
                //this.cartTotal += item.price
                // this.cartItems.push(item);
                // this.cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
                // this.db.list('/carts/' + cartKey).push(this.cartItems)
                this.cartItems.push(item);
                this.db.list('carts').update(cartKey! , this.cartItems);
                // this.db.list('/carts/' + cartKey).push(item);
                // localStorage.setItem('cartKey' , this.cartKey);
                // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    location.reload();
                })
            }
            
        //}

        // else {
        //     this.cartItems.forEach((i: { key: string; selectedSize: string; quantity: number; }) => {
        //         if(i.key == item.key && i.selectedSize == item.selectedSize) {
        //             i.quantity++;
        //             this.cartTotal+=item.price;
        //             // localStorage.setItem('cartTotal' , this.cartTotal.toString())
        //             // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        //             this.db.list("/carts/" + this.cartKey).push(item);
        //             done = true;
        //             Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
        //                 location.reload();
        //                 return;
        //             })
        //         }
        //     })
        //     if(!done) {
        //         this.cartTotal += item.price
        //         this.cartItems.push(item);
        //         this.db.list("/carts/" + this.cartKey).push(item);
        //         // localStorage.setItem('cartTotal' , this.cartTotal.toString())
        //         // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        //         Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
        //             // location.reload();
        //         })
        //     }

    
        }
        // this.cartItems.forEach((i: { key: string; selectedSize: string; quantity: number; }) => {
        //     if(i.key == item.key && i.selectedSize == item.selectedSize) {
        //         i.quantity++;
        //         this.cartTotal+=item.price;
        //         // localStorage.setItem('cartTotal' , this.cartTotal.toString())
        //         // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        //         cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
        //         localStorage.setItem('cartKey' , cartKey);
        //         done = true;
        //         Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
        //             location.reload();
        //             return;
        //         })
        //     }
        // })
        // if(!done) {
        //     this.cartTotal += item.price
        //     this.cartItems.push(item);
        //     cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
        //     localStorage.setItem('cartKey' , cartKey);
        //     // localStorage.setItem('cartTotal' , this.cartTotal.toString())
        //     // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        //     Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
        //         // location.reload();
        //     })
        // }
    //  }



    removeFromCart(item:Item) : void { 
        let cartKey = localStorage.getItem('cartKey');
        //this.cartItems = this.cartItems.filter(items => items != item) 
        // this.cartItems = this.cartItems.filter(items => items!=item);
        this.cartTotal -= item.price * item.quantity
        // localStorage.setItem('cartItems' , JSON.stringify(this.cartItems));
        // localStorage.setItem('cartTotal' , this.cartTotal.toString());

        //Ürün databasedeki ilgili cart'a pushlanırken ayrı bir key yaratılıyor. Her ürün için sepetKey adında bir değişken 
        //oluşturup o keye erişmeyi deneyebiliriz.
        this.db.list('/carts/' + cartKey).remove('-N8cjkDSM0Gy5xMauiW1')
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