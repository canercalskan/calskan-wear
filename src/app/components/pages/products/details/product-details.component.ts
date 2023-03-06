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
    visitedProducts : string[] = []
    product! : Item;
    deliveryShown : boolean = false;
    descriptionShown : boolean = false;
    xxsClicked : boolean = false;
    xsClicked : boolean = false;
    sClicked : boolean = false;
    mClicked : boolean = false;
    lClicked : boolean = false;
    xlClicked : boolean = false;
    xxlClicked : boolean = false;
    xxs!: HTMLElement 
    xs! :HTMLElement
    s!: HTMLElement 
    m !: HTMLElement 
    l!: HTMLElement 
    xl!: HTMLElement 
    xxl!: HTMLElement 

    constructor(private route : ActivatedRoute , private ItemService : ItemsService , private UserService : UserService){}
    ngOnInit() {
        this.visitedProducts = JSON.parse(localStorage.getItem('visitedProducts')!) || []
        this.route.params.subscribe(params => { 
            this.ItemService.getProduct(params["slug"]).subscribe(product => {
               this.product = product!
               this.UserService.pushLastSeenProducts(this.product!)
               this.xxs = document.getElementById('XXS')!;
               this.xs = document.getElementById('XS')!
               this.s = document.getElementById('S')!
               this.m = document.getElementById('M')!
               this.l = document.getElementById('L')!
               this.xl = document.getElementById('XL')!
               this.xxl = document.getElementById('XXL')!
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

    showDescription() : void {
        let description = document.getElementById('description-hidden')!;
        description.style.display = 'block'; 
        this.descriptionShown = true;
    }

    hideDescription() : void {
        let description = document.getElementById('description-hidden')!
        description.style.display = 'none';
        this.descriptionShown = false;
    }

    addToCart(item:Item) : void {
        let cart = document.getElementById('cart-dropdown')
        if(!this.xxsClicked && !this.xsClicked && !this.sClicked && !this.mClicked && !this.lClicked && !this.xlClicked && !this.xxlClicked) {
            Swal.fire('Beden Seçilmedi', 'Lütfen beden seçiniz' , 'warning');
            return;
        }
        else {
            if(this.xxsClicked) {
                item.selectedSize = 'XXS'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
            else if(this.xsClicked) {
                item.selectedSize = 'XS'
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
                item.selectedSize = 'XXL'
                this.UserService.addToCart(item);
                cart!.style.right = '0'
            }
        }
    }

    sizeHandler(beden : string) : void {
        console.log(beden)
        if(beden == 'XXS') {
            this.xxsClicked = true;
            this.xxs!.classList.add('clicked')
            this.xs!.classList.remove('clicked')
            this.s!.classList.remove('clicked')
            this.m!.classList.remove('clicked')
            this.l!.classList.remove('clicked')
            this.xl!.classList.remove('clicked')
            this.xxl.classList.remove('clicked')

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
            this.xs.classList.add('clicked')

            this.xxs.classList.remove('clicked')
            this.s.classList.remove('clicked')
            this.m.classList.remove('clicked')
            this.l.classList.remove('clicked')
            this.xl.classList.remove('clicked')
            this.xxl.classList.remove('clicked')

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
            this.s?.classList.add('clicked')

            this.xxs?.classList.remove('clicked');
            this.xs?.classList.remove('clicked')
            this.m?.classList.remove('clicked')
            this.l?.classList.remove('clicked')
            this.xl?.classList.remove('clicked')
            this.xxl?.classList.remove('clicked')

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
            this.m?.classList.add('clicked')

            this.xxs?.classList.remove('clicked')
            this.xs?.classList.remove('clicked')
            this.s?.classList.remove('clicked')
            this.l?.classList.remove('clicked')
            this.xl?.classList.remove('clicked')
            this.xxl?.classList.remove('clicked')

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
            this.l?.classList.add('clicked')

            this.xxs?.classList.remove('clicked')
            this.xs?.classList.remove('clicked')
            this.s?.classList.remove('clicked')
            this.m?.classList.remove('clicked')
            this.xl?.classList.remove('clicked')
            this.xxl?.classList.remove('clicked')

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
            this.xl?.classList.add('clicked')

            this.xxs?.classList.remove('clicked')
            this.xs?.classList.remove('clicked')
            this.s?.classList.remove('clicked')
            this.m?.classList.remove('clicked')
            this.l?.classList.remove('clicked')
            this.xxl?.classList.remove('clicked')

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
    getClassName() : string {
        if(this.xxsClicked) {
            return 'XXS'
        }
        else if(this.xsClicked) {
            return 'XS'
        }
        else if(this.sClicked) {
            return 'S'
        }
        else if(this.mClicked) {
            return 'M'
        }
        else if(this.lClicked) {
            return 'L'
        }
        else if(this.xlClicked) {
            return 'XL'
        }
        else if(this.xxlClicked) {
            return 'XXL'
        }
        else {
            return 'null'
        }
     }
}