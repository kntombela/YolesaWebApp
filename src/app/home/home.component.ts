import { Lead } from './../admin/lead/lead';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LeadService } from '../admin/lead/lead.service';
import { STATUS } from '../admin/shared/status';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  lead: Lead = {
    id: undefined,
    name: '',
    surname: '',
    email: '',
    phone: '',
    status: 0
  };

  constructor(private auth: AuthService, private leadService: LeadService) { }

  ngOnInit() {
    $('.cd100').countdown100({
      /*Set Endtime here*/
      /*Endtime must be > current time*/
      endtimeYear: 2018,
      endtimeMonth: 9,
      endtimeDate: 30,
      endtimeHours: 0,
      endtimeMinutes: 0,
      endtimeSeconds: 0,
      timeZone: "Africa/Johannesburg"
    });
  }

  add(lead: Lead): void {
    this.leadService.add(lead).subscribe(() => this.displayMessage("Thank you, we'll be in contact shortly!"));
  }

  displayMessage(message: string): void {
    this.message = message;
  }
}