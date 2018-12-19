import { Title } from '@angular/platform-browser';
import { GroupService } from './../group/group.service';
import { LeadService } from './../lead/lead.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  pageTitle = 'Admin Dashboard';
  leadCount: number;
  groupCount: number;
  groupListSub: Subscription;
  leadListSub: Subscription;

  constructor(
    private title: Title,
    private leadService: LeadService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.getLeadCount();
    this.getGroupCount();
  }

  getLeadCount() {
    this.leadListSub = this.leadService.get()
      .subscribe(leads => this.leadCount = leads.length);
  }

  getGroupCount() {
    this.groupListSub = this.groupService.get()
      .subscribe(groups => this.groupCount = groups.length);
  }

  

  ngOnDestroy() {
    this.leadListSub.unsubscribe();
    this.groupListSub.unsubscribe();
  }

     
}
