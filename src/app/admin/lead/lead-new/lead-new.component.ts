import { Location } from '@angular/common';
import { LeadService } from './../lead.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from '../lead';
import { STATUS } from '../../shared/status';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lead-new',
  templateUrl: './lead-new.component.html',
  styleUrls: ['./lead-new.component.css']
})
export class LeadNewComponent implements OnInit {

  pageTitle = 'New Lead';
  lead = new Lead();
  status = STATUS;

  constructor(
    private title: Title,
    private leadService: LeadService, 
    private location: Location
    ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  add(lead: Lead): void {
    this.leadService.add(lead).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
