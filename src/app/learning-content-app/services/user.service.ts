import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
  

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private passUser: User; 
  private UserOn: boolean = false;
  constructor(private router: Router) { }


  isLoggedIn(){
    return this.UserOn;
  }

  logIn(email: string, pass: string){
    var userInstance = JSON.parse(localStorage.getItem('passUser'));
    if (userInstance.email == email && userInstance.password == pass){
    this.UserOn = true;
    this.router.navigate(['search']);
    return true;
    }
    return false;
  }

  // logOut(){
  //   this.UserOn = false;
  // }
}
