import { ProfileService } from './profile.service';
import { User } from './../shared/user';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
const PROFILE_NAMESPACE = 'http://myapp.com/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    if (this.auth.user) {
      this.user = this.auth.user;
    } else {
      this.auth.getProfile((err, profile) => {
        this.user = new User(profile);
      });
    }
  }

  update(): void {
      this.profileService.update(this.user)
        .subscribe(_ => console.log(JSON.stringify(this.user.user_metadata)));
    // console.log(JSON.stringify(this.user.user_metadata));
  }
}
