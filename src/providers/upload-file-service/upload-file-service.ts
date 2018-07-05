import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs/Observable";
import { FileUpload } from "../../models/FileUpload";

@Injectable()
export class UploadFileService {
  private basePath = "/uploads";
  public downloadURL: string;
  fileUploads: any[];
  uploadProgress: Observable<number>;
  public id: string;
  constructor(
    private storage: AngularFireStorage
  ) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }): Observable<any[]> {
    return Observable.create(observer => {
      const ref = this.storage.ref(this.basePath + "/" + fileUpload.file.name);
      const task = ref.put(fileUpload.file);
      return task.percentageChanges().subscribe(res => {
        progress.percentage = res;
        if (res == 100) {
          ref.getDownloadURL().subscribe(q => {
            this.downloadURL = q;
            return observer.next(q);
          });
        }
      });
    });
  }

  public getFile(file: string) {
    return this.storage.ref(this.basePath + file).getDownloadURL();
  }

}
