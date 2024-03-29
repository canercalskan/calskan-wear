import { Component, OnInit } from "@angular/core";
import { ItemsService } from "src/app/services/admin/items.service";
import { Item } from "src/app/models/item.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
    templateUrl : './update-product.component.html',
    styleUrls : ['./update-product.component.css'],
    selector : 'update-product',
})

export class UpdateProduct implements OnInit {
    constructor(private ItemService : ItemsService , private router : Router , private route : ActivatedRoute , private db : AngularFireDatabase){}
    product! : Item;
    selectedImage? : FileList;
    percentage : number = 0
    currentFileUpload? : Item
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.ItemService.getProduct(params["productKey"]).subscribe(response => {
                this.product = response!;
                this.product.key = params["productKey"];
            })
        })
    };

    selectFile(event: any): void {
        this.selectedImage = event.target.files;
        if (this.selectedImage) {
          Swal.fire('Görseller upload etmeye hazır' , '' , 'info');
        }
      }

    updateProduct(data : Item) : void {
        if (this.selectedImage) {
            const file: FileList = this.selectedImage
            if (file) {
              console.log(this.product)
              this.currentFileUpload = new Item(file);
              this.currentFileUpload.description = data.description;
              this.currentFileUpload.title = data.title;
              this.currentFileUpload.price = data.price;
              this.currentFileUpload.sizes = this.product.sizes;
              this.ItemService.pushFileToStorage(this.currentFileUpload)
            }
        }
    }

    deleteProduct(product : Item) : void {
        product.key = this.product.key;
        this.ItemService.deleteFile(product).then(() => {
            Swal.fire('Başarılı' , 'Ürün başarıyla kaldırıldı' , 'success').then(() => {
                this.router.navigate(['/Administration/Update'])
            })
        })
    }
}
