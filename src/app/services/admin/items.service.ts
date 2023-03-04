import { Injectable, NgModule } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Item } from '../../models/item.model';
import slugify from 'slugify';

@NgModule()

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  private basePath = '/uploads/';
  private categoryPath = '/categories/';
  urls: string[] = []
  productUrls: string[] = [];
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage , private fireAuth : AngularFireAuth) {}
  pushFileToStorage(fileUpload: Item): void {
    for(let i = 0 ; i < fileUpload.file.length ; i++){
      let filePath = `${this.basePath}/${fileUpload.file.item(i)?.name}`;
      let storageRef = this.storage.ref(filePath);
      let uploadTask = this.storage.upload(filePath, fileUpload.file.item(i));
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.productUrls.push(downloadURL)
            if(this.productUrls.length === fileUpload.file.length) {
              console.log(this.productUrls);
              this.saveFileData(fileUpload , this.productUrls)
            }
          })
        })
      ).subscribe()
    }
  }

  private saveFileData(fileUpload: Item , urls : string[]): void {
    fileUpload.url = urls;
    fileUpload.slug = slugify(fileUpload.title , {lower : true, strict : true});
      this.db.list(this.basePath).push(fileUpload).then(() => {
        this.db.list(this.categoryPath + '/' + fileUpload.category).push(fileUpload);
      }).catch(error => {
        Swal.fire('' , error.code)
      });
  }

  getFiles(numberItems: number): AngularFireList<Item> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  getProduct(productKey : string) : Observable<any> {
    return this.db.object(this.basePath + '/' + productKey).valueChanges();
  }

  deleteFile(fileUpload: Item): Promise<void> {
    return this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.file.item(0)?.name!);
      })
      .catch(error => console.log(error));
  }

  updateProduct(data : Item) : Promise<AngularFireList<Item>> {
    return this.db.list('uploads').update(data.key , data).then()
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}