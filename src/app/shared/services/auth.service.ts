import { User } from './../../admin/shared/user';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

const LOGOUT_URI = 'https://yolesa.auth0.com/v2/logout?returnTo=http://localhost:4200';

@Injectable()

export class AuthService {

  userProfile: any;
  user: User;
  isAdmin: boolean;

  auth0 = new auth0.WebAuth({
    clientID: 'VcWNz2N1x48Et4hS3Jd8Z4h5IhQP1jMB',
    domain: 'yolesa.auth0.com',
    responseType: 'token id_token',
    audience: 'https://yolesa.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(private router: Router) {

  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/admin']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Redirect to logout API of Auth0 Note you must add the returnTo URL to 
    // the Allowed Logout URLs list in the Advanced tab of your Tenant Settings.
    window.location.href = LOGOUT_URI;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {      
        self.user = new User(profile);
        self.isAdmin = self.user.checkAdmin();
        console.log(JSON.stringify(self.user)); //TODO: Remove 
      }
      cb(err, profile);
    });
  }
}
