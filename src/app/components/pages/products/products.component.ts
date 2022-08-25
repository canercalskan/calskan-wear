import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Navbar } from 'src/app/layout/navbar/user/normal-navbar/user-navbar.component';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  selector: 'products',
})

export class ProductsComponent implements OnInit {
  cardItems : Item[] = [];
  fileUploads?: any[];
  productId? : number;
  navbar? : Navbar;
  constructor(private ItemService: ItemsService , private route : ActivatedRoute , private UserService : UserService, private router : Router) {}
  ngOnInit(): void {
    this.ItemService.getFiles(100)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
      });
  }

  addToCard(item:Item) : void {
    if(item.selectedSize == null || item.selectedSize.length == 0) {
      Swal.fire('' , 'Beden seçmediğiniz için ürünün detay sayfasına yönlendiriliyorsunuz' , 'warning').then(() => {
        this.router.navigate(['/Products/'+item.key])
        return;
      })
    }
    else {
    this.UserService.addToCart(item);
    let cart = document.getElementById('cart-dropdown')!;
    cart.style.right = '0';
    }
  }

  selectSize(product : Item,size:string) : void {
    product.selectedSize = size
  }
  
}

