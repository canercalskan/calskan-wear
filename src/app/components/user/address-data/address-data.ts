import { Component, Injectable, OnInit } from "@angular/core";
import * as addresses from './il-ilce.json';

@Component({
    selector: 'address-data',
    templateUrl : './address-data.html',
    styleUrls : ['./address-data.css'],
})

export class AddressDataComponent implements OnInit {
    addressData = addresses
    iller : string[] = []
    ilceler : string[] = []
    ilSelected : boolean = false;
    constructor(){}
    ngOnInit(): void {
        this.addressData.data.forEach(data => {
            this.iller.push(data.il_adi)
        })
    }

    handleIlSelection(il : string) {
        this.ilceler = [];
        this.addressData.data.find(selectedIl => selectedIl.il_adi == il)?.ilceler.forEach(ilce => {
            this.ilceler.push(ilce.ilce_adi);
        })
        this.ilSelected = true;
        return;
    }

    handleAddressSubmission(addressData : any) : void {}
}


