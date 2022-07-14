import { Injectable, NgModule } from "@angular/core";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from "src/app/models/user.model";
import { UserService } from "../user/user.service";

@Injectable({
    providedIn:'root'
})

@NgModule()

export class AuthService {
    constructor (private fireAuth : AngularFireAuth , private UserService : UserService){}
    registerSuccess : boolean = false;

    login(user:User) {
        this.fireAuth.signInWithEmailAndPassword(user.mail,user.password).then(()=> {
            localStorage.setItem('isLoggedIn' , 'true');
            this.fireAuth.user.subscribe(r => {
            //localStorage.setItem('uid', r?.uid.toString()!)
            this.UserService.getUsers().subscribe(response => {
               
            })
        })
        
            return true;
        } , err => {return false;})
    }


    register(user:User)  {
        this.fireAuth.createUserWithEmailAndPassword(user.mail,user.password).then(() => {
            // alert('New user registered successfully');
            this.fireAuth.user.subscribe(r => {
                alert('New user registered successfully');
                user.uid = r?.uid!
                this.UserService.registerUser(user).subscribe();
            })
        })
    }
}