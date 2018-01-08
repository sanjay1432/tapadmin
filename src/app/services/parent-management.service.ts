import { Injectable } from '@angular/core';
import {  Observable, Subject} from 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx'; //get everything from Rx    

import { Parent } from '../models/parent';
import {ParentStudentMapping} from '../models/parentstudentmapping';
import { PARENT } from '../data/mock-data';
import { SessionData } from '../models/session-data';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ParentManagementService {

  constructor(private http: Http, private httpService: HttpService) { }

  get(): Observable<Parent[]> {
    return this.httpService.httpGet(environment.PARENT_GET_URL);
  }
  find(id: number): Observable<Parent> {
    return this.httpService.httpGet(environment.BASE_URL + "api/parent/find/" + id);
  }
  update(parent: Parent): Observable<any> {
    return this.httpService.httpPost(parent, environment.BASE_URL + "api/parent/update");
  }
  addParent (parent: Parent): Observable<any> {
    return this.httpService.httpPost(parent,environment.PARENT_POST_URL);
  }
  saveStudent(psMapping:ParentStudentMapping): Observable<any> {
    return this.httpService.httpPost(psMapping, environment.BASE_URL + "api/ParentStudentMapping/create");
  }
  getParentStudents(id: number) {
    return this.httpService.httpGet( environment.BASE_URL + "api/ParentStudentMapping/find/" +id);
  }


    /** Post: Delete the teacher on the server */
    removeParent (parent: Parent): Observable<any> {
      console.log('delete service')
          console.log(parent)
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
