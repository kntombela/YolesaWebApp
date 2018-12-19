import { Title } from '@angular/platform-browser';
import { STATUS } from './../../shared/status';
import { LeadService } from './../lead.service';
import { Lead } from './../lead';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  pageTitle = 'Lead Detail';
  @Input() lead: Lead;
  status = STATUS;
  loading: boolean;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private leadService: LeadService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getLead();
  }

  private _getLead() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.leadService
      .getLead(id)
      .subscribe(lead => {
        this.lead = lead,
          this.loading = false;
      });
  }

  update() {
    this.leadService.update(this.lead)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
