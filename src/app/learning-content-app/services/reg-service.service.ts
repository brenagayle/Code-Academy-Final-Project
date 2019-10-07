import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { registerInterface } from './userInterface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
// import { componentRefresh } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class RegServiceService {



  constructor(
   public afAuth: AngularFireAuth,
   private router: Router
 ){}

 SendVerificationMail() {
  return this.afAuth.auth.currentUser.sendEmailVerification()
  }
 
  doRegister(value){
    
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.SendVerificationMail(); 
        setTimeout (() => this.router.navigate(['/login']), 3000);
        console.log(res);
      }, err => reject(err))
      
    }) 
  }


}



