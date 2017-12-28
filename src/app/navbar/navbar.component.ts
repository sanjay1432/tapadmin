import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { SessionData } from '../models/session-data';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  
  type: any;  

  constructor(public authService: AuthService, public router: Router, public app: AppComponent) { }

  ngOnInit() {

  }
  ngDoCheck() {      
    this.type = SessionData.userType;
  }
  logout() {
    SessionData.clear();
    this.authService.logout();    
  }
}
