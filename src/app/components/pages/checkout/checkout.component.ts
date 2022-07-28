import { Component } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
    styleUrls : ['./checkout.component.css'],
    templateUrl : './checkout.component.html',
    selector : 'checkout'
})

export class CheckoutComponent {
    constructor(private UserService : UserService , private router : Router){}
    items : Item[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    total : number = +(+localStorage.getItem('cartTotal')!).toFixed(2);
    pay() : void {
        this.UserService.pay(this.items,this.total)
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
        Swal.fire('Sipariş Oluşturuldu', 'Ürünleriniz hazırlanmaya başladı, siparişiniz için teşekkür ederiz.' , 'success').then(() => {
            this.router.navigate(['Home'])
        })

    }
}