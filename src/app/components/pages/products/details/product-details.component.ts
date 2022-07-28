import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from "src/app/services/admin/items.service";
import { OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";

@Component({
    selector : 'product-details',
    templateUrl : './product-details.component.html',
    styleUrls : ['./product-details.component.css'],
})
export class ProductDetails implements OnInit {
    product! : Item;
    constructor(private route : ActivatedRoute , private ItemService : ItemsService){}
    ngOnInit() {
        this.route.params.subscribe(params => { 
            this.ItemService.getProduct(params["productKey"]).subscribe( product => {
               this.product = product;
            })
        })
    }
}