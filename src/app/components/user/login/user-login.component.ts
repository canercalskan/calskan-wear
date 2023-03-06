import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  selector: 'login',
})

export class LoginComponent {
  constructor(private router: Router, private authservice: AuthService ) {}
  userError :boolean = false;
  passwordError: boolean = false;
  handleLogin(user: User) {
    this.userError=false;
    this.passwordError = false;
    this.authservice.login(user).then(() => {this.router.navigate([''])}).catch(error => {
        if(error.code == 'auth/user-not-found') {this.userError = true; Swal.fire('Hata' , 'Böyle bir kullanıcı bulunmamaktadır' , 'error')}
        else if(error.code == 'auth/wrong-password') {this.passwordError = true;}
    })
  }

  handleGoogleLogin() : void {
    this.authservice.googleLogin().then((result) => {
    }).catch(error => {
      alert(error.message);
    })
  }
  
  handleLogOut() : void {
    this.authservice.logOut();
  }


}
