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
        // this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(response => {
        //     this.items = response;
        //     this.total = this.UserService.getCartTotal();
        //     console.log(this.items)
        // });
        // this.activatedOffer = JSON.parse(sessionStorage.getItem('activeOffer')!);
        this.cart = this.UserService.getCart();
        this.activatedOffer = this.cart.offer;
        if(this.cart.items.length == 0){
            this.router.navigate(['../']);
        }
    }
    // ngOnInit(): void {
    //     // this.cartItems = this.UserService.getCartItems();
    //     // this.total = this.UserService.getCartTotal();
    //     // this.activatedOffer = this.UserService.getOffer();
    //     // this.cart = this.UserService.getCart();
    //     // this.activatedOffer = this.cart.offer;
    //     // this.db.list<Cart>('/carts/' + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(response => {
    //     //     this.cart = response
    //     //     this.total = this.UserService.getCartTotal()
    //     //     this.cart.forEach(crt => {
    //     //         this.items = response[0].items;
    //     //         this.activatedOffer = crt.offer
    //     //         console.log(response)
    //     //     })
    //     // });
    //     // this.activatedOffer = JSON.parse(sessionStorage.getItem('activeOffer')!);
    // }
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
                item.quantity++;
                this.cart.total += i.price;
                if(this.items.length == 1) {
                    this.db.list<Item>('/carts/' + '0').update(item.key , item);
                }
                else {
                    this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).update(item.key, item);
                }
                return;
            }
        //     i.items.forEach(itm => {
        //         if(itm.key === item.key && itm.selectedSize === item.selectedSize) {
        //             item.quantity++;
        //             this.total += itm.price;
        //             if(i.items.length == 1) {
        //                 this.db.list<Item>('/carts/' + '0').update(itm.key , item)
        //             }
        //             else {
        //                 this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).update(itm.key , item);
        //             }
        //         }
        //     })
        // })
        })
    }

    decrease(item : Item) : void {
        if(item.quantity <= 1) {
           this.cart.items =  this.cart.items.filter(i => i!= item);
           this.cart.total -= item.price;
            this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
        }
        else {
            item.quantity--;
            this.total -= item.price;
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
        if(this.cart.items.length === 0) {
            this.db.list('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
            location.reload();
            this.router.navigate(['Home']);
        }
    }
}
    