import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { User } from "src/app/models/user.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { Offer } from "src/app/models/offer.model";
import { OrderModel } from "src/app/models/order.model";
import { HttpClient } from "@angular/common/http";
@Component({
    templateUrl : './account.component.html',
    styleUrls : ['./account.component.css'],
    selector : 'account'
})
export class AccountComponent implements OnInit {
    currentUser! : User
    currentUserName! : string
    myInfoClicked : boolean = false;
    myAddressesClicked : boolean = false;
    myOffersClicked : boolean = false;
    myOrdersClicked : boolean = false;
    offerList! : Offer[];
    orderList! : OrderModel[];
    newPasswordMatches! : boolean;
    constructor(private fireAuth : AngularFireAuth, private UserService : UserService , private db : AngularFireDatabase, private router : Router , private http : HttpClient){}
    ngOnInit(): void {
        this.myInfoClicked = true;
        this.fireAuth.user.subscribe(u => {
            this.currentUserName = u?.displayName!;
        this.db.list<User>('users').valueChanges().subscribe(response => {
            response.forEach(user => {
                if(u?.uid === user.uid) {
                    this.currentUser = user;
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
    });

    this.db.list<OrderModel>('/orders/').valueChanges().subscribe(response => {
        this.fireAuth.user.subscribe(u => {
            response = response.filter(order => order.user == u?.uid)
            this.orderList = response
        })
        
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
        this.UserService.showMyAddresses(this.myAddressesClicked)
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


  handleInfoUpdate(formData : {name : string, oldPassword : string , newPassword : string , newPasswordAgain : string}) : void {
    this.db.list('users').update(this.currentUser.key , formData).then(() => {
        this.fireAuth.currentUser.then((updatable) => {
            updatable?.updateProfile({
                displayName : formData.name
            }).then(() => {
                if(formData.newPassword === formData.newPasswordAgain) {
                    this.newPasswordMatches = true;
                    updatable!.updatePassword(formData.newPassword)
                }
                else {
                    this.newPasswordMatches = false;
                    return;
                   }
            })
        .finally(()=> {
            if(this.newPasswordMatches == true){
                Swal.fire('Başarılı' , 'Üyelik bilgileriniz güncellendi' , "success")
            }
        })
      })
    })
  }
  handleDeleteAccount() : void {
    let currentUser : User
    Swal.fire('Uyarı' , 'Bu işlem geri alınamaz' , 'warning').then(() => {
        this.fireAuth.user.subscribe((response) => {
            this.db.list<User>('users').valueChanges().subscribe(users => {
                users.forEach(user => {
                    if(user.uid === response?.uid) {
                        currentUser = user;
                    }
                })
            })
            this.router.navigate(['Home']).then(() => {
                Swal.fire('Başarılı' , 'Hesabınız başarıyla silindi.' , 'success').then(() => {
                    response?.delete().then(() => {
                        this.db.list('users').remove(currentUser.key)
                        localStorage.removeItem('isLoggedIn')
                        return
                    })
                    .catch(error => {
                        if(error.code === "auth/requires-recent-login") {
                            Swal.fire('Giriş Yapın' ,' Bu işlem için yeniden giriş yapmanız gerekmektedir, yönlendiriliyorsunuz' , 'info').then(() => {
                                this.router.navigate(['Home']).then(() => {
                                    this.router.navigate(['Login']).then(() => {
                                        this.fireAuth.signOut().then(() => {
                                            localStorage.removeItem('isLoggedIn')
                                            return;
                                        })
                                    })
                                })
                            })
                        }})
                    })
                })
            })
        })
     }
} 
