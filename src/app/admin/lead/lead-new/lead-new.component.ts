import { Location } from '@angular/common';
import { LeadService } from './../lead.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from '../lead';
import { STATUS } from '../../shared/status';

@Component({
  selector: 'app-lead-new',
  templateUrl: './lead-new.component.html',
  styleUrls: ['./lead-new.component.css']
})
export class LeadNewComponent implements OnInit {

  lead: Lead = {
    id: undefined, 
    name: '', 
    surname: '', 
    email: '', 
    phone: '', 
    status: undefined
  };

  status = STATUS;

  constructor(private leadService: LeadService, private location: Location) { }

  ngOnInit() {
  }

  add(lead: Lead): void {
    this.leadService.add(lead).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
