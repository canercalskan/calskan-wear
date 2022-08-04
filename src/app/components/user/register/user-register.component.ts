import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
@Component({
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  selector: 'user-register',
})
export class RegisterComponent {
  constructor(
    private UserService: UserService,
    private authservice: AuthService,
    private fireAuth: AngularFireAuth
  ) {}
  registerDone: boolean = false;
  
  handleRegister(input: User): void {
    this.authservice.register(input).then(() => {
      this.fireAuth.currentUser.then(u => {
        input.uid = u!.uid
        this.UserService.registerUser(input)
      })
      this.registerDone = true;
      this.authservice.logOut().then(() => {Swal.fire('Başarılı' , 'E-Posta ve şifrenizle giriş yapabilirsiniz' , 'success')})
    })
  }
}
