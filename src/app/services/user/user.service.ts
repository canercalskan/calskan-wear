import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";

@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    constructor(private http: HttpClient){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>('https://test-b03cd-default-rtdb.europe-west1.firebasedatabase.app/users.json' , user)
    }
    getUsers() : Observable<User[]> {
        return this.http.get<User[]>('https://test-b03cd-default-rtdb.europe-west1.firebasedatabase.app/users.json');
    }
}