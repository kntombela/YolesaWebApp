import { Title } from '@angular/platform-browser';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Login';

  constructor(private title: Title, private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.auth.login();
  }

}
