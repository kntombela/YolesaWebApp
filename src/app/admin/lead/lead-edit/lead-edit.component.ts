import { Title } from '@angular/platform-browser';
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

  pageTitle = 'Edit Lead';
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
        this.lead = lead;
        this.loading = false;
      });
  }

  update() {
    this.leadService.update(this.lead)
      .subscribe(_ => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
