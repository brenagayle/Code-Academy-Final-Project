import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UploaderService } from '../services/uploader.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() exampleForm: FormGroup;
  @Output() fileEvent: EventEmitter<any> = new EventEmitter();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  //// Pretty sure 29-33 are not needed here -GW
  // Title and Description fields
  title: string;
  description: string;
  // Youtube embed field
  embed: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, public UploaderService: UploaderService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `files/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // Grabs the current user

    // COMMENTED OUT TO TEST FUNCTIONALITY
    // const user = firebase.auth().currentUser.uid;
    // if (firebase.auth().currentUser !== null)
    //     console.log("user id: " + firebase.auth().currentUser.uid);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);
        this.fileEvent.emit({ downloadURL: this.downloadURL, path,
          // MOVED DOWN A LINE AND COMMENTED OUT TO TEST FUNCTIONALITY
          // User: user
        })
        // this.db.collection('files').add( { downloadURL: this.downloadURL, path, User: user
        //   });
      }),
    );
    console.log('startUpload happened');
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
