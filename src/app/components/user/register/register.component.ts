import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  selector: 'register',
})
export class RegisterComponent {
  constructor(
    private UserService: UserService,
    private router: Router,
    private authservice: AuthService,
    private fireAuth: AngularFireAuth
  ) {}
  registerDone: boolean = false;
  
  //authservice.register fonksiyonu başarıyla register olduğunda, kullanıcı authenticate olmuş şekilde oturum açmış oluyor.
  handleRegister(input: User): void {
    this.authservice.register(input).then((R) => {
      this.fireAuth.user.subscribe((r) => {
        alert('New user registered successfully');
        input.uid = r?.uid!;
        this.UserService.registerUser(input).subscribe();
        this.registerDone = true;
      });
    });
  }
}
