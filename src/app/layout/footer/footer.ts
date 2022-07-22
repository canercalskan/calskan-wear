import { Component } from "@angular/core";
import { retry } from "rxjs";

@Component({
    styleUrls: ['./footer.css'],
    templateUrl: './footer.html',
    selector : 'footer'
})

export class Footer {
    loginStatus() : boolean{
        if(localStorage.getItem('isLoggedIn') == 'true') {
            return true;
        }
        else {
            return false;
        }
    }
}