import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from "src/app/services/admin/items.service";
import { OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector : 'product-details',
    templateUrl : './product-details.component.html',
    styleUrls : ['./product-details.component.css'],
})
export class ProductDetails implements OnInit {
    product! : Item;
    deliveryShown : boolean = false;
    constructor(private route : ActivatedRoute , private ItemService : ItemsService , private UserService : UserService){}
    ngOnInit() {
        this.route.params.subscribe(params => { 
            this.ItemService.getProduct(params["productKey"]).subscribe( product => {
               this.product = product;
            })
        })
    }
    showDelivery() : void {
        let message = document.getElementById('delivery-hidden');
        message!.style.display = 'block';
        this.deliveryShown = true;
    }
    hideDelivery():void {
        let message = document.getElementById('delivery-hidden');
        message!.style.display = 'none';
        this.deliveryShown = false;
    }

    addToCart(item:Item) : void {
        this.UserService.addToCart(item);
    }
}