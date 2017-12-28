import { Injectable } from '@angular/core';
import {  Observable, Subject} from 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { TEACHER } from '../data/mock-data';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable()
export class TeacherManagementService {
  private heroesUrl = 'http://tap-backend-qa.5sol.co.uk/api/teacher/get';  // URL to web api
  constructor(private http: Http) { }
  // get(): Observable<Teacher[]>{
  //   return of(TEACHER);
  // }
  get(): Observable<Teacher[]> {
    return this.http.get(this.heroesUrl)
      .map((response: Response) => {
        return <Teacher[] > JSON.parse(response.json())  
      });
  }
  getOne(id): Observable<Teacher>{
    return of(TEACHER.find(item => item.id === id));
  }

  // getOne(id): Observable<Teacher[]>{
  //   console.log(id)
  //   return this.http.get('http://tap-backend-qa.5sol.co.uk/api/teacher/GetProfile/'+id)
  //   .map((response: Response) => {
  //       console.log(response)
  //     return <Teacher[] > JSON.parse(response.json())  
  //   });
  // }
    /** Post: add the student on the server */
  addTeacher (teacher: Teacher): Observable<any> {
      console.log(teacher)
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    // const body = new HttpParams()
    // .set('Uname', teacher.username)
    // .set('name', teacher.name)
    // .set('phoneno', teacher.phoneno)
    // .set('roleId', teacher.roleID);

    return this.http.post('http://a639032f.ngrok.io/api/teacher/create', teacher, options).pipe(
      tap(_ => console.log(`add teacher`)),
      catchError(this.handleError<any>('addTeacher'))
    );
  }

  /** PUT: update the student on the server */
  updateTeacher (teacher: Teacher): Observable<any> {
    console.log(teacher)
 return this.http.put('', teacher).pipe(
   tap(_ => console.log(`updated student id=${teacher.id}`)),
   catchError(this.handleError<any>('updateStudent'))
 );
}

    
   /** Post: Delete the teacher on the server */
   removeTeacher (teacher: Teacher): Observable<any> {
    console.log('delete service')
        console.log(teacher)
    return this.http.delete('').pipe(
      tap(_ => console.log(`delete teacher`)),
      catchError(this.handleError<any>('deleteTeacher'))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
