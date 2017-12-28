import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, NgModel, Validators, FormGroup } from '@angular/forms';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { AuthService } from '../auth.service';
import { SessionData } from '../models/session-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  bar: boolean;


  constructor(public authService: AuthService, public router: Router) { 
    localStorage.clear();
  }

  ngOnInit() {

  }
  onLogin(login: NgForm) {
    this.bar = true;

    this.authService.login(login.value).subscribe((user) => {

      if (user.hasOwnProperty('error')) {
        this.error = 'Invalid username/password!';
      } else {

        
        SessionData.AuthToken = user.access_token;
        SessionData.userType = 'admin';

        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = SessionData.redirectURL ? SessionData.redirectURL : '/student-management';
        
        // Redirect the user
        this.router.navigate([redirect]);
      }
      this.bar = false;


    });

  }
}
