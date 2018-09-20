import { MessageService } from './../components/messages/message.service';
import { AddressType } from './addressTypeEnum';
import { Address } from './address';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private accessPointUrl: string = 'https://localhost:44314/api/addresses';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET: Get address by member id*/
  getMemberAddress(memberId: number, addressType: AddressType): Observable<Address> {
    var uri = 'https://localhost:44314/api/members/' + memberId + '/addresses/' + addressType;
    return this.http.get<Address>(uri, httpOptions)
    .pipe(
      tap(),
      catchError(this.handleError<Address>('getMemberAddress'))
    );  
  }

  /** PUT: */
  update(address: Address): Observable<any> {
    return this.http.put(this.accessPointUrl + '/' + address.id, address, httpOptions) 
    .pipe(
        tap(_ => this.log(`updated address id=${address.id}`, true)),
        catchError(this.handleError<any>('updateAddress')) 
      );
  }

  /** POST: */
  add (address: Address): Observable<Address> {
    return this.http.post<Address>(this.accessPointUrl, address, httpOptions).pipe(
      tap((address: Address) => this.log(`added address w/ id=${address.id}`, true)),
      catchError(this.handleError<Address>('addAddress'))
    );
  }

  /******************** Private Helpers ********************/
  private log(message: string, isSuccess: boolean) {
    this.messageService.add(`AddressService: ${message}`, isSuccess);
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
