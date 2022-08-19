import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
    templateUrl : './forgot-password.html',
    styleUrls : ['./forgot-password.css'],
    selector : 'forgot-password',
})

export class ForgotPassword {
    constructor(private fireAuth : AngularFireAuth , private router : Router){}
    passwordResetCodeSubmitted :boolean = false;
    handlePasswordResetFormSubmit(email : {email : string}) {
        this.fireAuth.sendPasswordResetEmail(email.email).then((r) => {
            Swal.fire('' , 'Şifre sıfırlama linki mailinize gönderildi' , 'success').then(()=>{
                this.passwordResetCodeSubmitted = true;
                this.router.navigate(['Login'])
            })
        }).catch(error => console.log(error))
    }
}