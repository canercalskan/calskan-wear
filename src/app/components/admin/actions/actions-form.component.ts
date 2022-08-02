import { Component, Injectable, NgModule } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { Item } from 'src/app/models/item.model';

@Injectable({ providedIn: 'root' })
@Component({
  templateUrl : './actions-form.component.html',
  selector : 'admin-actions',
  styleUrls : ['./actions-form.component.css']
})

export class ProductActions {
  constructor(private UploadService: ItemsService) {}
  selectedFiles?: FileList;
  currentFileUpload?: Item;
  percentage = 0;
  sizes : string[] = [];
  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      alert('Görseller yüklenmeye hazır');
    }
  }

  upload(item:Item): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new Item(file);
        this.currentFileUpload.description = item.description;
        this.currentFileUpload.title = item.title;
        this.currentFileUpload.price = item.price;
        this.currentFileUpload.sizes = this.sizes;
        console.log(this.currentFileUpload);
        this.UploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          }
        );
      }
    }
  }

  delete(): void {
    if(this.selectedFiles) {
      const file:File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined
      if(file) {
        const itemToBeDeleted = new Item(file);
        this.UploadService.deleteFile(itemToBeDeleted)
      }
    }
  }

  selectSizeHandler(size : string) : void {
    let found = false;
    for(let i = 0; i< this.sizes.length; i++) {
      if(this.sizes[i] == size) {
        this.sizes = this.sizes.filter(j => j != size)
        console.log(this.sizes)
        found = true;
        break;
      }
    }
    if(!found) {
      this.sizes.push(size);
      console.log(this.sizes)
    }
  }
}
