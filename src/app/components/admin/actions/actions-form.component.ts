import { Component, Injectable, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { Item } from 'src/app/models/item.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({ providedIn: 'root' })
@Component({
  templateUrl : './actions-form.component.html',
  selector : 'admin-actions',
  styleUrls : ['./actions-form.component.css']
})

export class ProductActions {
  constructor(private UploadService: ItemsService , private ItemService : ItemsService , private db : AngularFireDatabase , private router : Router , private fireAuth : AngularFireAuth) {}
  selectedFiles?: FileList;
  currentFileUpload?: Item;
  percentage = 0;
  sizes : string[] = [];
  products : any[]= [];
  showUpdate : boolean = false;

  ngOnInit(): void {
    if(this.router.url === '/Administration/Update') {
      this.showUpdate = true;
    }
    this.ItemService.getFiles(20)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.products = fileUploads;
        console.log(this.products)
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      Swal.fire('Görseller upload edilmeye hazır' , '' , 'info').then(() => {
        console.log(this.selectedFiles)
      })
    }
  }

  upload(item:Item): void {
    if (this.selectedFiles) {
      const file: FileList | null = this.selectedFiles
      this.selectedFiles = undefined;

      if (file.length > 0) {
          this.currentFileUpload = new Item(file);
          this.currentFileUpload.description = item.description;
          this.currentFileUpload.title = item.title;
          this.currentFileUpload.price = item.price;
          this.currentFileUpload.sizes = this.sizes;
          this.currentFileUpload.category = item.category;
          this.UploadService.pushFileToStorage(this.currentFileUpload)
          
      //   this.currentFileUpload = new Item(file);
      //   this.currentFileUpload.description = item.description;
      //   this.currentFileUpload.title = item.title;
      //   this.currentFileUpload.price = item.price;
      //   this.currentFileUpload.sizes = this.sizes;
      //   this.currentFileUpload.category = item.category;
      //   this.UploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      //     (percentage) => {
      //       this.percentage = Math.round(percentage ? percentage : 0);
      //       if(this.percentage === 100) {

      //     }
      //   }
      // )}
    }
  }
}



  delete(): void {
    if(this.selectedFiles) {
      const file: FileList | null = this.selectedFiles
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
