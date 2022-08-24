import { Injectable, NgModule } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Item } from '../../models/item.model';

@NgModule()

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  private basePath = '/uploads/';
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage , private fireAuth : AngularFireAuth) {}
  pushFileToStorage(fileUpload: Item): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    let getWithRest! : Item
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe(u => {console.warn(u?.state)});
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: Item): void {
      this.db.list(this.basePath + '/' + fileUpload.category).push(fileUpload).catch(error => {Swal.fire('' , error.code)});
  }

  getFiles(numberItems: number): AngularFireList<Item> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }


  getProduct(productKey : string) : Observable<any> {
    //item modele key ekle, yüklenince key ataması yap ki kategori sistemiyle getproduct senkron çalışabilsin
    return this.db.object(this.basePath + '/' + productKey).valueChanges();
  }

  deleteFile(fileUpload: Item): Promise<void> {
    return this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.file.name);
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