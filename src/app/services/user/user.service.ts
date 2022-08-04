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
    cartItems! : Array<Item>;
    cartTotal : number = +localStorage.getItem('cartTotal')!;
    constructor(private http: HttpClient , private db : AngularFireDatabase , private fireAuth : AngularFireAuth){
        //this.db.object<Array<Item>>
        this.db.list<Item>("/carts/" + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(items => {
            this.cartItems = items!;
            if(this.cartItems == null) {
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

    //Eğer localstorage'da set edilmiş bir cartKey varsa, o keyi alıp database'de ilgili cart' a erişip düzenlemeleri yap
    //Eğer localstorage'da set edilmiş bir cartKey yoksa, yeni bir key yarat ve erişip düzenlemeleri yap

    addToCart(item:Item) {
        let cartKey = localStorage.getItem('cartKey');
        let done = false;
        if(cartKey == null || cartKey == undefined) {
            if(this.cartItems.length == 0) {
                this.cartItems.push(item);
                cartKey = this.db.list('carts').push(this.cartItems).key!.toString();
                localStorage.setItem('cartKey' , cartKey);
                return;
            } 
            this.cartItems.forEach((i : { key: string; selectedSize: string; quantity: number; })  => {
                if(i.key == item.key && i.selectedSize == item.selectedSize) {
                    i.quantity++;
                    this.cartTotal+=item.price;
                    // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                    // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                    cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
                    localStorage.setItem('cartKey' , cartKey);
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
                cartKey = this.db.list('carts').push(this.cartItems).key?.toString()!;
                localStorage.setItem('cartKey' , cartKey);
                // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    location.reload();
                })
            }
            
        }

        else {
            this.cartItems.forEach((i: { key: string; selectedSize: string; quantity: number; }) => {
                if(i.key == item.key && i.selectedSize == item.selectedSize) {
                    i.quantity++;
                    this.cartTotal+=item.price;
                    // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                    // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                    this.db.list("/carts/" + cartKey).push(item);
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
                this.db.list("/carts/" + cartKey).push(item);
                // localStorage.setItem('cartTotal' , this.cartTotal.toString())
                // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
                Swal.fire('Başarılı', 'Ürün başarıyla sepete eklendi' , 'success').then(() => {
                    // location.reload();
                })
            }
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
    }

    removeFromCart(item:Item) : void { 
        //this.cartItems = this.cartItems.filter(items => items != item) 
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