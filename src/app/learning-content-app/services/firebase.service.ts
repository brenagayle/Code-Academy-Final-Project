import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserComment } from './user-comment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getFile(userKey) {
    return this.db.collection('files').doc(userKey).snapshotChanges();
  }

  getFiles() {
    return this.db.collection('files').snapshotChanges();
  }

  getTestimonials() {
    return this.db.collection('testimonials').snapshotChanges();
  }
  itemId: any;

  getOneFile(oneId: any) {
    this.itemId = oneId;
  }

  sendOneFile() {
    return this.db.collection("files").doc(this.itemId).get();
  }

  getUserComments() {
    return this.db.collection("files").doc(this.itemId).collection('comments').get();
  }

  createUserComment(comment: UserComment) {
    console.log(comment)
    this.db.collection('files').doc(this.itemId).collection('comments').add(comment);
  }





}

