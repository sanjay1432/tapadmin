import { Injectable } from '@angular/core';
import {  Observable, Subject} from 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { TEACHER } from '../data/mock-data';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { SessionData } from '../models/session-data';
import { HttpService } from './http.service';
import 'rxjs/Rx'; //get everything from Rx    
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class TeacherManagementService {

  constructor(private http: Http, private httpService: HttpService) { }

  get(): Observable<Teacher[]> {
    return this.httpService.httpGet(environment.TEACHER_GET_URL);
  }

  find(id: number): Observable<Teacher> {
    return this.httpService.httpGet(environment.BASE_URL + "api/teacher/find/" + id);
  }
  update(teacher: Teacher): Observable<any> {
    return this.httpService.httpPost(teacher, environment.BASE_URL + "api/teacher/update");
  }
    /** Post: add the student on the server */
  addTeacher (teacher: Teacher): Observable<any> {
    return this.httpService.httpPost(teacher,environment.TEACHER_POST_URL);
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
