import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile: any;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log(JSON.stringify(this.profile));
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile; 
      });
    }
  }

  public logout(): void {
    this.auth.logout();
  }

}
