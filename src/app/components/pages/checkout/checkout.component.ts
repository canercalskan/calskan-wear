import { Component } from "@angular/core";
import { Item } from "src/app/models/item.model";
@Component({
    styleUrls : ['./checkout.component.css'],
    templateUrl : './checkout.component.html',
    selector : 'checkout'
})

export class CheckoutComponent {
    items : Item[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    total : number = +localStorage.getItem('cartTotal')!;
}