import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AddressModel } from "src/app/models/address.model";
import { UserService } from "src/app/services/user/user.service";
import { Router } from "@angular/router";
import * as addresses from '../../../../components/user/address-data/il-ilce.json';
@Component({
    selector : 'anonymous-pay',
    templateUrl : 'anonymous-pay.component.html',
    styleUrls : ['anonymous-pay.component.css'],
})

export class AnonymousPay  implements OnInit {
    addressData = addresses;
    iller : string[] = []
    ilceler : string[] = [];
    anonymUser! : User
    anonymUserAddress! : AddressModel
    cartKey = localStorage.getItem('cartKey');
    constructor(private userService : UserService , private router : Router){}
    ngOnInit(): void { 
        this.addressData.data.forEach(il => {
            this.iller.push(il.il_adi);
        })
        let cart = this.userService.getCart()
     }

     handleIlSelection(selectedIl : string) : void {
        this.ilceler = []
        this.addressData.data.forEach(il => {
            if(il.il_adi === selectedIl) {
                il.ilceler.forEach(ilce => {
                    this.ilceler.push(ilce.ilce_adi);
                })
            }
        })
     }

    handleAnonymousInfoFormSubmission(adress : AddressModel) : void {
        console.log(adress) // başarılı
    }
}