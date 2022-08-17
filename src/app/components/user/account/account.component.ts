import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { User } from "src/app/models/user.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { Offer } from "src/app/models/offer.model";
@Component({
    templateUrl : './account.component.html',
    styleUrls : ['./account.component.css'],
    selector : 'account'
})

export class AccountComponent implements OnInit {
    currentUser! : User
    myInfoClicked : boolean = false;
    myAddressesClicked : boolean = false;
    myOffersClicked : boolean = false;
    myOrdersClicked : boolean = false;
    offerList! : Offer[]
    constructor(private fireAuth : AngularFireAuth, private UserService : UserService , private db : AngularFireDatabase, private router : Router){}
    ngOnInit(): void {
        this.fireAuth.user.subscribe(u => {
        this.db.list<User>('users').valueChanges().subscribe(response => {
            response.forEach(user => {
                if(u?.uid === user.uid) {
                    this.currentUser = user;
                    // if(this.currentUser == null || this.currentUser == undefined) {
                    //     this.router.navigate(['Home'])
                    // }
                }
                else if(u?.providerId == 'firebase') {
                    //register as a new user.
                }
            })
        })
    })
    this.db.list<Offer>('/offers/').valueChanges().subscribe(response => {
        response = response.filter(offer => offer.hidden != true)
        this.offerList = response;
        
    })
  }

    showMyInfo() : void {
        this.myInfoClicked = true;
        this.myAddressesClicked = false;
        this.myOffersClicked = false;
        this.myOrdersClicked = false;
    }
    showMyAddresses() : void {
        this.myAddressesClicked = true;
        this.myInfoClicked = false;
        this.myOffersClicked = false;
        this.myOrdersClicked = false;
    }
    showMyOffers() : void {
        this.myOffersClicked = true;
        this.myOrdersClicked = false;
        this.myInfoClicked = false;
        this.myAddressesClicked = false;
    }
    showMyOrders() : void {
        this.myOrdersClicked = true;
        this.myOffersClicked = false;
        this.myInfoClicked = false;
        this.myAddressesClicked = false;
    }


  handleInfoUpdate(formData : User) : void {
    this.db.list('users').update(this.currentUser.key , formData).then(() => {
        this.fireAuth.currentUser.then((updatable) => {
            // updatable!.updateEmail(formData.mail).then(()=> {
            // updatable!.updatePassword(formData.password);
            // })
            updatable!.updateProfile({
                displayName : formData.name
            }).then(() => {
                updatable!.updatePassword(formData.password).then(() => {console.log('password changed')});
            }).then(()=> {
                updatable!.updateEmail(formData.mail).then(()=>{console.log('email changed')});
            })
        .finally(()=> {
            Swal.fire('Başarılı' , 'Üyelik bilgileriniz güncellendi , lütfen yeniden giriş yapın' , "success")
            // this.fireAuth.signOut();
            // location.reload();
        })
      })
    })
  }
} 
