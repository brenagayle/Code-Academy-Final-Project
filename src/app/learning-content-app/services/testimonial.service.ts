import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TestimonialServiceService {
  
  @Input() file: File;

  constructor(
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage, private db: AngularFirestore

  ) { }

  createTestimonial(value) {

    // The storage path
    const path = `testimonials/${Date.now()}_${value.userName}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);
    const user = firebase.auth().currentUser.uid;

    return this.db.collection('testimonials').add({ 
      userName: value.userName, 
      // totalStars: value.totalStars,
      testimonialName: value.testimonialName, 
      textfield: value.textfield, 
      uid: user
    });
  }
}