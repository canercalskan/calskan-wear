import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from "src/app/services/admin/items.service";
import { OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";

@Component({
    selector : 'product-details',
    templateUrl : './product-details.component.html',
    styleUrls : ['./product-details.component.css'],
})
export class ProductDetails implements OnInit {
    product! : Item;
    deliveryShown : boolean = false;
    sClicked : boolean = false;
    mClicked : boolean = false;
    lClicked : boolean = false;
    xlClicked : boolean = false;
    constructor(private route : ActivatedRoute , private ItemService : ItemsService , private UserService : UserService){}
    ngOnInit() {
        this.route.params.subscribe(params => { 
            this.ItemService.getProduct(params["productKey"]).subscribe( product => {
               this.product = product;
               this.product.key = params['productKey'];
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
        let cart = document.getElementById('cart-dropdown')
        if(!this.sClicked && !this.mClicked && !this.lClicked && !this.xlClicked) {
            Swal.fire('Beden Seçilmedi', 'Lütfen beden seçiniz' , 'warning');
            return;
        }
        else {
            if(this.sClicked) {
                item.size = 'S'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.mClicked) {
                item.size = 'M'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.lClicked) {
                item.size = 'L'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.xlClicked) {
                item.size = 'XL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
        }
    }

    sizeHandler(beden : string) : void {
        if(beden == 's') {
            this.sClicked = true;
            this.mClicked = false;
            this.lClicked = false;
            this.xlClicked = false;
            return
        }
        else if(beden == 'm') {
            this.mClicked = true;
            this.sClicked = false;
            this.lClicked = false;
            this.xlClicked = false
            return
        }
        else if(beden == 'l') {
            this.lClicked = true;
            this.sClicked = false;
            this.mClicked = false;
            this.xlClicked = false;
            return
        }
        else if(beden == 'xl') {
            this.xlClicked = true;
            this.sClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            return
        }
    }
}