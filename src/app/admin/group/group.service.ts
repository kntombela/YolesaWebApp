import { Group } from './group';
import { Observable,  of } from 'rxjs';
import { MessageService } from './../components/messages/message.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private accessPointUrl: string = 'https://localhost:44314/api/groups';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET: Get all leads*/
  public get(): Observable<Group[]> {
    return this.http.get<Group[]>(this.accessPointUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getGroups', []))
      );
  }

  /** GET: Get group by user id*/
  getGroupByUserId(userId: string): Observable<Group> {
    var uri = 'https://localhost:44314/api/groupusers/' + userId + '/groups';
    return this.http.get<Group>(uri, httpOptions)
    .pipe(
      tap(),
      catchError(this.handleError<Group>('getGroup'))
    );  
  }

  /** GET: Get group by id*/
  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(this.accessPointUrl + '/' + id, httpOptions)
    .pipe(
      tap(),
      catchError(this.handleError<Group>('getGroup'))
    );  
  }

  /** PUT: */
  update(group: Group): Observable<any> {
    return this.http.put(this.accessPointUrl + '/' + group.id, group, httpOptions) 
    .pipe(
        tap(_ => this.log(`updated group id=${group.id}`, true)),
        catchError(this.handleError<any>('updateGroup')) 
      );
  }

  /** POST: */
  add (group: Group): Observable<Group> {
    return this.http.post<Group>(this.accessPointUrl, group, httpOptions).pipe(
      tap((group: Group) => this.log(`added group w/ id=${group.id}`, true)),
      catchError(this.handleError<Group>('addGroup'))
    );
  }

  /** POST: */
  delete (ids: any[]): Observable<any> {
    return this.http.post<any[]>(this.accessPointUrl + '/delete', ids , httpOptions).pipe(
      tap(_ => this.log(`deleted groups`, true)),
      catchError(this.handleError<Group>('deleteGroup'))
    );
  }

  /******************** Private Helpers ********************/
  private log(message: string, isSuccess: boolean) {
    this.messageService.add(`GroupService: ${message}`, isSuccess);
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
