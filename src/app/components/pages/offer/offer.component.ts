import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Offer } from "src/app/models/offer.model";
@Component({
    templateUrl : './offer.component.html',
    styleUrls : ['./offer.component.css'],
    selector : 'offer'
})

export class OfferComponent {
    constructor(private db : AngularFireDatabase) {};
    rateSelected : boolean = false;
    codeRate : number = 0;
    buildClicked : boolean = false;
    chooseClicked : boolean = false;
    activeOffers : boolean = false;
    makeOffer(code: Offer) : void {
        let offer = new Offer();
        offer.code = code.code
        offer.rate = this.codeRate;
        if(!this.rateSelected) {
            Swal.fire('Hata' , 'Oran seçimi yapınız' , 'error').then(() => {
                return;
            })
        }
        else {
            this.db.list('offers').push(offer).then((r) => {
                offer.key = r.key!;
                this.db.list('offers').update(offer.key , offer); // Insert the key.
                Swal.fire('Başarılı' , 'Kampanya oluşturuldu' , 'success')
            }).catch(err => Swal.fire(err , '' , 'error'))
        }
    }

    showBuild() : void {
        this.buildClicked = true;
        this.chooseClicked = false;
        this.activeOffers = false;
    }
    showChoose() : void {
        this.chooseClicked = true;
        this.buildClicked = false;
        this.activeOffers = false;
    }
    showOffers() : void {
        this.activeOffers = true;
        this.chooseClicked = false;
        this.buildClicked = false;
    }

    handleRateSelection(rate : number) : void {
        this.rateSelected = true;
        this.codeRate = rate;
    }
}