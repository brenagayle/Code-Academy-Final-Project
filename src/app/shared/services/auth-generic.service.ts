import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UserStoreService } from './user-store.service';
import { User } from '../interfaces/users';





@Injectable()
export class AuthGenericService {
  // userData: Observable<firebase.User>;
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  userAuth;
  constructor(private router: Router,
              private userStore: UserStoreService,
              private angularFireAuth: AngularFireAuth,
              private afs: AngularFirestore, )
  {
     this.userCollection = this.afs.collection('Users');
  }




  doLogin(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          const token = this.getUserInfo();
          this.getUserbyID().subscribe(u =>{
            if (res.user.emailVerified !== true) {
              this.sendVerificationMail();
              reject('Please validate your email address. Kindly check your inbox.');
            }
            this.userStore.updateUser(u[0]);
            resolve(token);
           
          });
        
        }, err => reject("incorrect username or password"));
    });
  }

  // Verification Email //
  sendVerificationMail() {
    return this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  signup(email: string, password: string, username: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user = this.angularFireAuth.auth.currentUser;
        this.addGeneralUserInfo(user, username);
        this.sendVerificationMail();
        window.alert('Successfully signed up! Please validate your email address. Kindly check your inbox.');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }
  // Creates a new user //
  addGeneralUserInfo(user, username) {
    const userCollection = this.afs.collection('Users');
    userCollection.add({
      uid: user.uid,
      displayname: username,
      email: user.email,
      permission: 'user'
    });
  }

  getUserbyID() {
    return this.afs.collection('Users', ref => ref.where('uid', '==', this.getUserInfo().uid ))
    .snapshotChanges().pipe(map(actions => {
    return actions.map(x => {
      const data = x.payload.doc.data() as any;
      const id = x.payload.doc.id;
      return {id, ...data};
    });
    }));
  }
  getUserInfo() {
    this.userAuth = this.angularFireAuth.auth.currentUser;
    return this.userAuth ? ({
      name: this.userAuth.displayname,
      email: this.userAuth.email,
      uid: this.userAuth.uid,
    }) : {uid: null};
  }
  /* Sign out */
  signout() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {
        this.userStore.updateUser({uid: null});
        this.router.navigate([`/login`]);
      }).catch(error => {
      });


  }
  // Update a users permissions level in the firestore User Collection
  updateUserPerm(data, permission) {
    return this.afs.collection('Users')
    .doc(data.id)
    .set({permission}, {merge: true });
  }

  // Get All users and pipe data changes so Material Design tables display correctly //
  getAllUsers() {
    return this.afs.collection('Users').snapshotChanges().pipe(map(actions => {
      return actions.map(x => {
        const data = x.payload.doc.data() as any;
        const id = x.payload.doc.id;
        return {id, ...data};
      });

  }));}

      }
