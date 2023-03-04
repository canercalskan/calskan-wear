import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLogin {
  constructor(private service: AdminService , private router : Router , private fireAuth : AngularFireAuth) {}
  adminExistError : boolean = false;
  adminPasswordError : boolean = false;
  handleLogin(admin : Admin) {
    this.adminExistError = false;
    this.adminPasswordError = false;
    this.service.authAdmin(admin).then(() => {
        this.router.navigate(['Administration'])
    }).catch(error => {
        if(error.code == 'auth/user-not-found') {this.adminExistError = true; Swal.fire('Hata', 'E-Posta veya şifreniz hatalı' , 'error')}
        else if(error.code == 'auth/wrong-password') {this.adminPasswordError = true;}
    });
  }
}
