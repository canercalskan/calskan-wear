import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root',
})
@NgModule()

export class AuthService {
  registerSuccess: boolean = false;
  noUserFound: boolean = false;
  wrongPassword: boolean = false;
  returnValue : boolean = false;
  constructor(
    private fireAuth: AngularFireAuth,
    private UserService: UserService
  ) {}

  login(user: User) : Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(user.mail,user.password).then()
  }

  logOut() : Promise<void> {
    return this.fireAuth.signOut().then()
  }

  register(user: User) : Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(user.mail,user.password).then()
  }
}
