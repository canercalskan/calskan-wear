import { Component } from '@angular/core';
import { ItemsService } from 'src/app/services/admin/items.service';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
    admin : string = localStorage.getItem('admin')!;
    ngOnInit() : void {
        
    }
//   constructor(private UploadService: ItemsService) {}
//   selectedFiles?: FileList;
//   currentFileUpload?: Item;
//   percentage = 0;
//   ngOnInit(): void {}

//   selectFile(event: any): void {
//     this.selectedFiles = event.target.files;
//     if(this.selectedFiles) { alert('Görseller yüklenmeye hazır')}
//   }

//   upload(): void {
//     if (this.selectedFiles) {
//       const file: File | null = this.selectedFiles.item(0);
//       this.selectedFiles = undefined;

//       if (file) {
//         this.currentFileUpload = new Item(file);
//         this.UploadService.pushFileToStorage(this.currentFileUpload).subscribe(
//           (percentage) => {
//             this.percentage = Math.round(percentage ? percentage : 0);
//           }
//         );
//       }
//     }
//   }

//   delete() : void {}

}
