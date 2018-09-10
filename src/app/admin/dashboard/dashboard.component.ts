import { GroupService } from './../group/group.service';
import { LeadService } from './../lead/lead.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  leadCount: number;
  groupCount: number;

  constructor(
    private leadService: LeadService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.getLeadCount();
    this.getGroupCount();
  }

  getLeadCount() {
    this.leadService.get()
      .subscribe(leads => this.leadCount = leads.length);
  }

  getGroupCount() {
    this.groupService.get()
      .subscribe(groups => this.groupCount = groups.length);
  }

}
