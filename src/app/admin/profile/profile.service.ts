import { MANAGE_AUTH_CONFIG } from './../../auth/manage.auth.config';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../shared/user';
import { MessageService } from './../components/messages/message.service';
import { Observable, of } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { ENV } from 'src/app/core/env.config';

const httpOptions = {
  headers: new HttpHeaders({ 'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFUVkNNelV4UVVOQ1JrRTVRamhGUmpSRFF6VTNPRFExTmtFeE9FUTFRak5DTVRORk56RkZSQSJ9.eyJpc3MiOiJodHRwczovL3lvbGVzYS5hdXRoMC5jb20vIiwic3ViIjoibGU1dk5xakpRSTc4ZFdJRWN5N2JlNGlIN29DNjVWN09AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8veW9sZXNhLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTQzOTU1MzY0LCJleHAiOjE1NDQwNDE3NjQsImF6cCI6ImxlNXZOcWpKUUk3OGRXSUVjeTdiZTRpSDdvQzY1VjdPIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.DBoGiJXGt_9bO0vXa5fCp6n3aIYK4dJEBMaNtw12iV1cPLPVv9fBNVUoSUzzRcjQX49BaKefgK9P5tkpcOombrVnQU93QwZeD53ZiybDPiqgzgEUX2qf4-yFpwhIrMDs_hzhYTPAhya74d10H-sHGewdsne3eDon4wNIXYoVosRce2pDqo8bVIombVAhEvDvay16DSHqVo79SVEuakc0pqyxgNX3qEvJ0Vq9q3L7oMA7UHjxIb11Q5pWhe0ZF1dsJbQ8LhvV304zDZCAfMew_NpjHIJZXHJCipG6dvumxv6f2HuXJ0Lzu99vNPMF9caWoAMb7rUYjMl0UWLiClPWkA', 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private accessPointUrl: string = `${ENV.MGMT_API}`;
  managementAccessToken: string;
  private _manageAuthData = {
    client_id: MANAGE_AUTH_CONFIG.CLIENT_ID,
    client_secret: MANAGE_AUTH_CONFIG.CLIENT_SECRET,
    audience: MANAGE_AUTH_CONFIG.AUDIENCE,
    grant_type: MANAGE_AUTH_CONFIG.GRANT_TYPE
  }

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** PUT: */
  update(id: number, user_metadata: any): Observable<any> {
    return this.http.patch(this.accessPointUrl + 'users/' + id, { "user_metadata": user_metadata }, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
      .pipe(
        tap(_ => this.log(`updated profile id=${id}`, true)),
        catchError(this.handleError<any>('updateProfile'))
      );
  }

  /** GET: Get user by userid*/
  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.accessPointUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
      .pipe(
        tap(),
        catchError(this.handleError<any>('getUser'))
      );
  }

  getManagementAccessToken(): Observable<any> {
    return this.http.post<any>('https://yolesa.auth0.com/oauth/token', this._manageAuthData)
      .pipe(
        tap(),
        catchError(this.handleError<any>('getManagementAccesstoken'))
      )
  }

  /******************** Private Helpers ********************/
  private get _authHeader(): string {
    return `Bearer ${this.managementAccessToken}`;
  }

  private log(message: string, isSuccess: boolean) {
    this.messageService.add(`ProfileService: ${message}`, isSuccess);
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
