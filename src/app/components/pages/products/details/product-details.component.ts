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
    xxsClicked : boolean = false;
    xsClicked : boolean = false;
    sClicked : boolean = false;
    mClicked : boolean = false;
    lClicked : boolean = false;
    xlClicked : boolean = false;
    xxlClicked : boolean = false;
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
        if(!this.xxsClicked && !this.xsClicked && !this.sClicked && !this.mClicked && !this.lClicked && !this.xlClicked && !this.xxlClicked) {
            Swal.fire('Beden Seçilmedi', 'Lütfen beden seçiniz' , 'warning');
            return;
        }
        else {
            if(this.xxsClicked) {
                item.selectedSize = 'XL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.xsClicked) {
                item.selectedSize = 'XL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.sClicked) {
                item.selectedSize = 'S'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.mClicked) {
                item.selectedSize = 'M'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.lClicked) {
                item.selectedSize = 'L'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.xlClicked) {
                item.selectedSize = 'XL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.xxlClicked) {
                item.selectedSize = 'XL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
        }
    }

    sizeHandler(beden : string) : void {
        if(beden == 'XXS') {
            this.xxsClicked = true;
            this.xsClicked = false
            this.sClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            this.xlClicked = false;
            this.xxlClicked = false;
            return
        }
        else if(beden == 'XS') {
            this.xsClicked = true;
            this.xxsClicked = false
            this.sClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            this.xlClicked = false;
            this.xxlClicked = false;
            return
        }
        else if(beden == 'S') {
            this.sClicked = true;
            this.xxsClicked = false;
            this.xsClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            this.xlClicked = false;
            this.xxlClicked = false;
            return
        }
        else if(beden == 'M') {
            this.mClicked = true;
            this.xxsClicked = false;
            this.xsClicked = false;
            this.sClicked = false;
            this.lClicked = false;
            this.xlClicked = false
            this.xxlClicked = false;
            return
        }
        else if(beden == 'L') {
            this.lClicked = true;
            this.xxsClicked = false;
            this.xsClicked = false;
            this.sClicked = false;
            this.mClicked = false;
            this.xlClicked = false;
            this.xxlClicked = false;
            return
        }
        else if(beden == 'XL') {
            this.xlClicked = true;
            this.xxsClicked = false;
            this.xsClicked = false;
            this.sClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            this.xxlClicked = false;
            return
        }
        else if(beden == 'XXL') {
            this.xxlClicked = true;
            this.xxsClicked = false;
            this.xsClicked = false;
            this.sClicked = false;
            this.mClicked = false;
            this.lClicked = false;
            this.xlClicked = false;
            return
        }
    }
}