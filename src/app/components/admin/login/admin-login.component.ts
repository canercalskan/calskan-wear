import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLogin {
  constructor(private service: AdminService , private router : Router) {
  }
  adminExistError : boolean = false;
  adminPasswordError : boolean = false;
  handleLogin(admin : Admin) {
    this.adminExistError = false;
    this.adminPasswordError = false;
    this.service.authAdmin(admin).then(() => {
        localStorage.setItem('admin' , admin.mail)
        this.router.navigate(['Administration'])
    }).catch(error => {
        if(error.code == 'auth/user-not-found') {this.adminExistError = true;}
        else if(error.code == 'auth/wrong-password') {this.adminPasswordError = true;}
    });
  }
}
