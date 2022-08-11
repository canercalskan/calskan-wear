import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AdminService } from "src/app/services/admin/admin.service";
import { Offer } from "src/app/models/offer.model";
import Swal from "sweetalert2";
@Component({
    selector : 'active-offers',
    templateUrl : './active-offers.html',
    styleUrls : ['./active-offers.css']
})

export class ActiveOffers implements OnInit{
    constructor(private db : AngularFireDatabase , private AdminService : AdminService){}
    OfferList! : Offer[];
    ngOnInit(): void {
      this.AdminService.getOffers().valueChanges().subscribe(response => {
        this.OfferList = response;
      })
    }
    deleteOffer(offer : Offer) : void {
        this.db.list('offers').remove(offer.key).then(() => {
            Swal.fire('Başarılı' , 'Kampanya kodu kullanımdan kaldırıldı').then(() => {
                location.reload();
            })
        })
    }
}