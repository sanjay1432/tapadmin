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
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SessionData } from '../models/session-data';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';


import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StudentManagementService {


  constructor(private http: Http, private httpService: HttpService) { }
  
  get(): Observable<Student[]> {
    return this.httpService.httpGet(environment.STUDENT_GET_URL);
  }

  getLate(id): Observable<Studentlate[]>{
    return of(STUDENTLATE.filter(x => x.userid == id));
  }

  getMeeting(id): Observable<Studentmeeting[]>{
    return of(STUDENTMEETING.filter(x => x.userid == id));
  }
  
  getUnlinked(): Observable<Student[]> {
    return this.httpService.httpGet( environment.BASE_URL + "api/student/unlinked");
  }
  find(id: number): Observable<Student> {
    return this.httpService.httpGet(environment.BASE_URL + "api/student/find/" + id);
  }
  update(student: Student): Observable<any> {
    return this.httpService.httpPost(student, environment.BASE_URL + "api/student/update");
  }

   /** Post: add the student on the server */
  addStudent (student: Student): Observable<any> {
    console.log(student)
    return this.httpService.httpPost(student,environment.STUDENT_POST_URL);
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
