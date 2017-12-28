import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import {  Observable, Subject} from 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Teacher } from '../models/teacher';
import { TEACHER } from '../data/mock-data';
import { Student } from '../models/student';
import { Studentlate } from '../models/studentlate';
import { Studentmeeting } from '../models/studentmeeting';
import { STUDENTLATE } from '../data/mock-data';
import { STUDENTS } from '../data/mock-data';
import { STUDENTMEETING } from '../data/mock-data';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';


// const httpOptions = {
//   headers: new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE','Access-Control-Allow-Headers': 'X-Requested-With,content-type'})
// };
@Injectable()
export class StudentManagementService {

  private heroesUrl = 'http://tap-backend-qa.5sol.co.uk/api/student/get';  // URL to web api
  constructor(private http: Http) { }
  
  get(): Observable<Student[]> {
    return this.http.get(this.heroesUrl)
      .map((response: Response) => {
        return <Student[]> JSON.parse(response.json())  
      });
  }
  // get(): Observable<Student[]>{
  //   return of(STUDENTS);
  // }
  getLate(id): Observable<Studentlate[]>{
    return of(STUDENTLATE.filter(x => x.userid == id));
  }

  getMeeting(id): Observable<Studentmeeting[]>{
    return of(STUDENTMEETING.filter(x => x.userid == id));
  }
  getOne(id): Observable<Student>{
  
    return of(STUDENTS.find(item => item.userid === id));
  }
  /** PUT: update the student on the server */
  updateStudent (student: Student): Observable<any> {
       console.log(student)
    return this.http.put('', student).pipe(
      tap(_ => console.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }
  
   /** Post: add the student on the server */
  addStudent (student: Student): Observable<any> {
    console.log('Add service')
        console.log(student)
    return this.http.post('', student).pipe(
      tap(_ => console.log(`add student`)),
      catchError(this.handleError<any>('addStudent'))
    );
  }
  
  /** Post: Delete the student on the server */
  removeStudent (student: Student): Observable<any> {
  console.log('delete service')
      console.log(student)
  return this.http.delete('').pipe(
    tap(_ => console.log(`delete student`)),
    catchError(this.handleError<any>('deleteStudent'))
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
