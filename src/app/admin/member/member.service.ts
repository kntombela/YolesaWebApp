import { Member } from './member';
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
export class MemberService {

  private accessPointUrl: string = 'https://localhost:44314/api/members';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET: Get all members*/
  public get(): Observable<Member[]> {
    return this.http.get<Member[]>(this.accessPointUrl, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getMembers', []))
      );
  }

  /** GET: Get members by groupId*/
  public getMembersByGroupID(groupId: number): Observable<Member[]> {
    var uri = 'https://localhost:44314/api/groups/' + groupId + '/members';
    return this.http.get<Member[]>(uri, httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError('getMembersByGroupID', []))
      );
  }


  /******************** Private Helpers ********************/
  private log(message: string, isSuccess: boolean) {
    this.messageService.add(`MemberService: ${message}`, isSuccess);
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
