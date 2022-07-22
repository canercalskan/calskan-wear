import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  selector: 'products',
})
export class ProductsComponent implements OnInit {
  fileUploads?: any[];
  productId? : number;
  constructor(private ItemService: ItemsService , private route : ActivatedRoute) {}
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
    console.log(item)
  }
}

