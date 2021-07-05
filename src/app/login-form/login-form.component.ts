import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { User } from './../../assets/models/User';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  //Email validation state
  isEmail = false;

  //Toggle password visibility
  hide = true;

  //User object to bind user input with
  user : User = new User('','');

  //Change email validation state based on user input
  handleEmailChange(email : String){
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null){
      this.isEmail = true;
    }else
      this.isEmail = false;
  }

  //Handle form submission
  onSubmit(){
    if (!this.isEmail){
      this.snackBar.open('Invalid Email','',{duration : 2000})
    }else{
      this.authService.authenticate(this.user)
      .subscribe(res => {
        console.log('Sign in : ' + res);
        //Navigate to success component
        if (res)
          this.router.navigate(['./profile'])
        else
          this.snackBar.open('Unkown Email or Wrong Password ... Or Both','',{duration : 2000})
      },err => {
        console.log(err);
      })
    }
  }

  //Instantiating authentication service to sign in
  //Instantiating router service to nprivate router : Router){}
  constructor(private authService : AuthenticationService,
              private router : Router,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

}
