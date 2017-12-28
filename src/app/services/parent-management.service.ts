import { Injectable } from '@angular/core';
import {  Observable, Subject} from 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx'; //get everything from Rx    

import { Parent } from '../models/parent';
import { PARENT } from '../data/mock-data';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable()
export class ParentManagementService {
  private heroesUrl = 'http://tap-backend-qa.5sol.co.uk/api/parent/get';  // URL to web api
  constructor(private http: Http) { }
   
  // get(): Observable<Parent[]>{
  //   return of(PARENT);
  // }
  get(): Observable<Parent[]> {
    return this.http.get(this.heroesUrl)
      .map((response: Response) => {
        return <Parent[] > JSON.parse(response.json())  
      });
  }
  getOne(id): Observable<Parent>{
  
    return of(PARENT.find(item => item.userid === id));
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
