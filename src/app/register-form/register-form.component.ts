import { Component, OnInit } from '@angular/core';
import { AuthGenericService } from '../shared/services/auth-generic.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  constructor(private auth: AuthGenericService) { }

  signup() {
    let userName = this.firstName + " " + this.lastName;
    this.auth.signup(this.email , this.password, userName);
  }

  ngOnInit() {
    
  }

}

