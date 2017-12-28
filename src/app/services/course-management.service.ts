import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/operators/retry';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
import {COURSE} from '../data/mock-data';
import { Course } from '../models/course';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class CourseManagementService {

  private heroesUrl = 'http://tap-backend-qa.5sol.co.uk/api/course/get';  // URL to web api
  
  constructor(private http: Http, private httpService: HttpService) { }
   
   get(): Observable<Course[]> {
     return this.httpService.httpGet(environment.COURSE_GET_URL);
   }
  
  getOne(code): Observable<Course>{
  
    return of(COURSE.find(item => item.code === code));
  }

   /** Post: Delete the teacher on the server */
   removeCourse (course: Course): Observable<any> {
    console.log('delete service')
        console.log(course)
    return this.http.delete('').pipe(
      tap(_ => console.log(`delete parent`)),
      catchError(this.handleError<any>('deleteParent'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    console.log(message);
  }
  
}