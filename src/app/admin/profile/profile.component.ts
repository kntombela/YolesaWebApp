import { Title } from '@angular/platform-browser';
import { ProfileService } from './profile.service';
import { User } from './../shared/user';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AUTH_CONFIG } from 'src/app/auth/auth.config';
const PROFILE_NAMESPACE = 'http://myapp.com/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pageTitle = 'User Profile';
  user_metadata: any;

  constructor(
    private title: Title,
    public auth: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getProfile();
    this._getManagementAccess();
  }

  update() {
    if (this.profileService.managementAccessToken) {
      console.log('Management Access Token set ' + this.profileService.managementAccessToken);
      this.profileService.update(this.auth.userProfile.sub, this.user_metadata)
        .subscribe(_ => console.log(JSON.stringify(this.user_metadata)));
    } else {
      console.log('Management Access Token not set');
    }
  }

  private _getProfile() {
    if (this.auth.userProfile) {
      this.user_metadata = this.auth.userProfile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
      console.log(JSON.stringify(this.auth.userProfile));
    } else {
      this.auth.renewToken();
      this.user_metadata = this.auth.userProfile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
    }
  }

  private _getManagementAccess() {
    this.profileService.getManagementAccessToken().subscribe(
      data => { this.profileService.managementAccessToken = data['access_token'], console.log(JSON.stringify(data)) }
    );
  }
}
