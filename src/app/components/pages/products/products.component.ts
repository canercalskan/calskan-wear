import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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
      // this.route.params.subscribe(params => {
      //   this.productId = params['productId'];
      // })
  }
}
// constructor( private hospitalService: HospitalService, private route: ActivatedRoute ) // lets say you get the hospital info from the hospitalService via a get
// ngOnInit(){
//   this.route.params.subscribe(params => {
//       this.hospitalId = params.hospitalId
//       this.hospitalService.getHospital(this.hospitalId).subscribe( hospital => {
//        this.hospital = hospital
//       }
//   }
// }
