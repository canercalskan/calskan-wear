import { Component, Injectable, OnInit } from "@angular/core";
import * as addresses from './il-ilce.json';
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/models/user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import Swal from "sweetalert2";
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
    showForm : boolean = false;
    currentUser! : User
    newAddressClicked : boolean = false;
    constructor( private UserService : UserService , private fireAuth : AngularFireAuth , private db : AngularFireDatabase) {}
    ngOnInit(): void {
        this.currentUser = this.UserService.currentUser;
        this.addressData.data.forEach(data => {
            this.iller.push(data.il_adi)
        })
    
        if(this.UserService.getMyAddresses() === true) {
            this.showForm = true;
        }
    }

    handleIlSelection(il : string) {
        this.ilceler = [];
        this.addressData.data.find(selectedIl => selectedIl.il_adi == il)?.ilceler.forEach(ilce => {
            this.ilceler.push(ilce.ilce_adi);
        })
        this.ilSelected = true;
        return;
    }

    handleNewAddressButton() : void {
        this.newAddressClicked = true;
        let form = document.getElementById('addressForm');
        let body = document.getElementById('body');
        body!.style.backgroundColor = '#C1C1C1'
        form!.style.backgroundColor = 'white'
    }

    closeNewAddressForm() : void {
        this.newAddressClicked = false;
        let form = document.getElementById('addressForm');
        let body = document.getElementById('body');
        body!.style.backgroundColor = 'white';
        form!.style.backgroundColor = 'transparent'
    }

    handleAddressSubmission
    (addressData : {
        ad : string,soyad : string,
        il : string,
        ilce : string,
        adres : string,
        telefon : string,
        baslik : string
      }
    ) : void {
        let user = this.currentUser;
        if(user.address == undefined || user.address == null) {
            user.address = []
            user.address.push(addressData);
        }
        else {
            user.address.push(addressData);
        }
        
        this.db.list<User>('users').update(user.key , user).then(() => {
            Swal.fire('Başarılı' , 'Adresiniz başarıyla kaydedildi' , 'success').then(() => {
                this.newAddressClicked = false;
                let form = document.getElementById('addressForm');
                let body = document.getElementById('body');
                body!.style.backgroundColor = 'white';
                form!.style.backgroundColor = 'transparent'
            })

        }).catch(err => Swal.fire(err , '' , 'warning'))
    }
}


