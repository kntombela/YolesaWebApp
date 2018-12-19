import { CrudUtilService } from './../../shared/utils/crud.util.service';
import { HeaderService } from './header.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public auth: AuthService,
    public crud: CrudUtilService,
  ) { }

}
