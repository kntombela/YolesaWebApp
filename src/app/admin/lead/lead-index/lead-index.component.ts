import { CrudUtil } from './../../shared/utils/crudUtil';
import { Checkboxes } from './../../shared/checkboxes';
import { Location } from '@angular/common';
import { LeadService } from './../lead.service';
import { Lead } from './../lead';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'app-lead-index',
  templateUrl: './lead-index.component.html',
  styleUrls: ['./lead-index.component.css']
})
export class LeadIndexComponent implements OnInit {

  pageTitle = 'Lead Index';
  leads: Lead[];
  crud = new CrudUtil(this.leads);

  constructor(
    private leadService: LeadService,
    location: Location
  ) { }

  ngOnInit() {
    this.getLeads();
  }

  getLeads(): void {
    this.leadService.get()
      .subscribe(leads => this.crud.data = leads);
  }

  delete(): void {
    this.leadService.delete(this.crud.getSelectedItemIds()).subscribe(response => {
      this.getLeads(); //Refresh of data can only happen once data is available => async
    });
    $('#deleteModal').modal('hide');
    this.crud.resetSelectedItems();
  }

  onCheckAllRows(value) {
    this.crud.checkAll(value);
  }

  onCheckRow(value, id) {
    this.crud.checkRow(value, id);
  }

  refresh(){
    this.getLeads();
  }
}
