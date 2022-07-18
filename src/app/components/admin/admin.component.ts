import { Component } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
    admin : string = localStorage.getItem('admin')!;
    ngOnInit() : void {
        
    }
}
