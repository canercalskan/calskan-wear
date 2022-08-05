import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
    styleUrls : ['./checkout.component.css'],
    templateUrl : './checkout.component.html',
    selector : 'checkout'
})

export class CheckoutComponent {
    constructor(private UserService : UserService , private router : Router , private route : ActivatedRoute , private db : AngularFireDatabase){
        this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).valueChanges().subscribe(response => {
            this.items = response;
            console.log(response)
        })
    }
    items! : Item[];
    total : number = +(+localStorage.getItem('cartTotal')!).toFixed(2);
    pay() : void {
        this.UserService.pay(this.items,this.total)
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
        Swal.fire('Sipariş Oluşturuldu', 'Ürünleriniz hazırlanmaya başladı, siparişiniz için teşekkür ederiz.' , 'success').then(() => {
            this.router.navigate(['Home'])
        })
    }
    increase(item : Item) : void {
       this.items.forEach(i => {
            if(i.key === item.key && i.selectedSize === item.selectedSize) {
                // i.quantity += 1;
                item.quantity++;
                this.total += i.price;
                // localStorage.setItem('cartItems' , JSON.stringify(this.items));
                if(this.items.length == 1) {
                    this.db.list<Item>('/carts/' + '0').update(item.key , item);
                    console.log('tek item artırıldı');
                }
                else {
                    this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).update(item.key, item);
                }
        
                localStorage.setItem('cartTotal' , this.total.toString())
                return;
            }
        })
    }

    decrease(item : Item) : void {
        if(item.quantity <= 1) {
           this.items =  this.items.filter(i => i!= item);
           this.total -= item.price;
            // localStorage.setItem( 'cartItems', JSON.stringify(this.items))
            this.db.list<Item>('/carts/' + localStorage.getItem('cartKey')?.toString()).remove(item.key);
            localStorage.setItem('cartTotal' , this.total.toString());
        }
        else {
            item.quantity--;
            this.total -= item.price;
            for(var i in this.items) {
                if(this.items[i].quantity > 0 && this.items[i].key === item.key && this.items[i].selectedSize === item.selectedSize) {
                    this.items[i].quantity = item.quantity;
                    // localStorage.setItem('cartItems' , JSON.stringify(this.items));
                    localStorage.setItem('cartTotal' , this.total.toString());
                    break;
                }
                else if(this.items[i].quantity <= 0 && this.items[i].key === item.key) {
                    this.items = this.items.filter(j => j!= this.items[i]);
                    // localStorage.setItem('cartItems' , JSON.stringify(this.items));
                    localStorage.setItem('cartTotal' , this.total.toString());
                    break;
                }
            }
            
        }
        if(this.items.length === 0) {
            location.reload();
            this.router.navigate(['Home']);
        }
    }
}