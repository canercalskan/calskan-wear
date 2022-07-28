import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Navbar } from 'src/app/layout/navbar/user/user-navbar.component';
import { UserService } from 'src/app/services/user/user.service';

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
  constructor(private ItemService: ItemsService , private route : ActivatedRoute , private UserService : UserService) {}
  ngOnInit(): void {
    this.ItemService.getFiles(6)
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
    this.UserService.addToCart(item);
  }
}

