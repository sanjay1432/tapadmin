import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { SessionData } from '../models/session-data';

@Injectable()
export class HttpService {

  constructor(private http: Http, private router: Router) {
  }

  public httpAuthPost(user: any, url: string): Observable<any> {

    let data = new URLSearchParams();
    data.append('username', user.username);
    data.append('password', user.password);
    data.append('grant_type', 'password');
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, data.toString(), { headers: headers }).map((response: Response) => this.parseResponse(response))
      .catch((err: any) => this.handleError(err));

  }

  public httpPost(body: any, url: string): Observable<any> {
    let headers = new Headers();

    if (typeof (Storage) !== "undefined") {
      let token = localStorage.getItem("AuthToken");
      headers.append('Authorization', 'bearer ' + token);
    }
    return this.http.post(url, body,
      {
        headers: headers
      }).map((response: Response) => this.parseResponse(response))
      .catch((err: any) => this.handleError(err));

  }

  private handleError(error: any) {
    try {
      if (error.status == 401) {
        this.router.navigate(['']);
      }
      else if(error.status == 400)
      {
        return Observable.of(error.json());    
      }
    }
    catch (ex) {
      console.log(ex);
    }
    var body = error.json();
    return Observable.throw(body);

  }

  private parseResponse(response: Response) {
    let body = response.json();
    return body;
  }

  public httpGet(url: string) {
    let headers = new Headers();
    if (typeof (Storage) !== "undefined") {

      headers.append('Authorization', 'Bearer ' + SessionData.AuthToken);
      //  let token = localStorage.getItem('AuthToken');
      //headers.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get(url, { headers: headers }).map(
      (response: Response) => this.parseResponse(response))
      .catch((err: any) => this.handleError(err));

  }

  public httpFilePost(formData: any, url: string): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (typeof (Storage) !== 'undefined') {
      const token = localStorage.getItem('AuthToken');
      headers.append('Authorization', 'Bearer ' + token);
    }
    return this.http.post(url, formData, { headers: headers }).map((response: Response) => this.parseResponse(response))
      .catch((err: any) => this.handleError(err));
  }
}
