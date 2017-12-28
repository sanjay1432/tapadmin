import { Component, OnInit } from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService }      from '../auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
   
  }
 
}
