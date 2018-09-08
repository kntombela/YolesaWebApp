import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lead } from './lead';
import { Observable, of } from '../../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../components/messages/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private accessPointUrl: string = 'https://localhost:44314/api/leads';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** GET: Get all leads*/
  public get(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.accessPointUrl, httpOptions) 
    .pipe(
        tap(),
        catchError(this.handleError('getLeads', []))
      );
  }

  /** GET: Get lead by id*/
  getLead(id: number): Observable<Lead> {
    return this.http.get<Lead>(this.accessPointUrl + '/' + id, httpOptions)
    .pipe(
      tap(),
      catchError(this.handleError<Lead>('getLead'))
    );  
  }

  /** PUT: */
  update(lead: Lead): Observable<any> {
    return this.http.put(this.accessPointUrl + '/' + lead.id, lead, httpOptions) 
    .pipe(
        tap(_ => this.log(`updated lead id=${lead.id}`, true)),
        catchError(this.handleError<any>('updateLead')) 
      );
  }

  /** POST: */
  add (lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.accessPointUrl, lead, httpOptions).pipe(
      tap((lead: Lead) => this.log(`added lead w/ id=${lead.id}`, true)),
      catchError(this.handleError<Lead>('addLead'))
    );
  }

  /** POST: */
  delete (ids: any[]): Observable<any> {
    return this.http.post<any[]>(this.accessPointUrl + '/delete', ids , httpOptions).pipe(
      tap(_ => this.log(`deleted leads`, true)),
      catchError(this.handleError<Lead>('deleteLead'))
    );
  }

  /******************** Private Helpers ********************/
  private log(message: string, isSuccess: boolean) {
    this.messageService.add(`LeadService: ${message}`, isSuccess);
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
      this.log(`${operation} failed: ${error.message}`, false);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
