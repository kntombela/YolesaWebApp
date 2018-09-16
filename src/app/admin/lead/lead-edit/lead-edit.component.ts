import { Component, OnInit, Input } from '@angular/core';
import { Lead } from '../lead';
import { STATUS } from '../../shared/status';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from '../lead.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnInit {

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
