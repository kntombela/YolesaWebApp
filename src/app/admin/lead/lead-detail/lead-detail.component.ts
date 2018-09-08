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

  @Input() lead: Lead;
  status = STATUS;

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getLead();
  }

  getLead(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.leadService.getLead(id)
      .subscribe(lead => this.lead = lead);
  }

  update(): void {
    this.leadService.update(this.lead)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
