import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router, NavigationExtras } from '@angular/router';
import { HttpService } from './services/http.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  constructor(public router: Router, private httpService: HttpService) { }

  // store the URL so we can redirect after logging in  

  login(user): any {
    return this.httpService.httpAuthPost(user, environment.TOKEN_URL);

  }

  logout(): void {    
    this.router.navigate(['/login']);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/