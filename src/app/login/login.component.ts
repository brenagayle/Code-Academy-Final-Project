import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGenericService } from '../shared/services/auth-generic.service';
​
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
​
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  userId;
  error: boolean = false;
  userMessage = "enter your password"
  constructor(private authService: AuthGenericService, private router: Router) { }
​
  
  tryLogin(){
    this.authService.doLogin(this.email, this.password)
    .then(res => {   
      this.router.navigate(['/dual-landing-page']);   
    }, err => {
      console.log(err);
      this.userMessage = err;
      this.error = true;
    })
  }
​
  ngOnInit() {
  }
}
