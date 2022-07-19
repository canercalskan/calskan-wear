import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { map } from 'rxjs/operators';
@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  selector: 'products',
})
export class ProductsComponent implements OnInit {
  fileUploads?: any[];
  constructor(private ItemService: ItemsService) {}
  ngOnInit(): void {
    this.ItemService.getFiles(6)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
      });
  }
}
