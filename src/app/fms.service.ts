import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mergeAll } from 'rxjs/operators';

import { Fms } from './fms';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'ClientId': 'q2i-testing'})
};


@Injectable()
export class FmsService {

  public fmsTexts = [];
  private fmsUrl = '/api/open/texts/obcTxt?version=pending';

  private log(message: string) {
    this.messageService.add('FmsService: ' + message);
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getToken(token: string) {
    return this.fmsTexts[token];
  }

  getAll() {
    if(this.fmsTexts){
      return Object.entries(this.fmsTexts).slice(0,4);
    }
    else {
      console.log('nope');
      return [];
    }
  }

  loadTexts(): Observable<Fms[]> {
    const url = `${this.fmsUrl}`;
    return this.http.get<Fms[]>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched fms texts`)),
      catchError(this.handleError<Fms[]>(`getTexts`))
    );
  }



}
