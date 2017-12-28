import { Component, OnInit } from '@angular/core';
import { SessionData } from './models/session-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOpen: boolean;
  isLogin: boolean = false;
  title = 'TAP Panel';
  // events=[];
  constructor() { }
  ngOnInit() {
    // console.log(this.events)


  }
  events(event) {
    this.isOpen = event;
  }

  ngDoCheck() {    
    this.isLogin = SessionData.hasLoggedIn;
  }
 
}
