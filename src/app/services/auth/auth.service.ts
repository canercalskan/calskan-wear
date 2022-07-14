import { Injectable, NgModule } from "@angular/core";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn:'root'
})

@NgModule()

export class AuthService {
    constructor (private fireAuth : AngularFireAuth){}

    registerStatus : boolean = false;
    login(user:User) {
        this.fireAuth.signInWithEmailAndPassword(user.mail,user.password).then(()=> {
            localStorage.setItem('isLoggedIn' , 'true');
            this.fireAuth.user.subscribe(r => {
                r?.updateProfile({
                    displayName: 'Damla',
                })
                alert('Welcome '+ r?.displayName)
               })
            return true;
        } , err => {return false;})
    }
    register(user:User) {
        this.fireAuth.createUserWithEmailAndPassword(user.mail,user.password).then(() => {
            alert('New user registered successfully');
        })
    }
}