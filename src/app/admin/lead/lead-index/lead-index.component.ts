import { UtilsService } from './../../../core/utils.service';
import { Title } from '@angular/platform-browser';
import { CrudUtil } from './../../shared/utils/crudUtil';
import { LeadService } from './../lead.service';
import { Lead } from './../lead';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-lead-index',
  templateUrl: './lead-index.component.html',
  styleUrls: ['./lead-index.component.css']
})
export class LeadIndexComponent implements OnInit {

  pageTitle = 'Lead Index';
  leads: Lead[];
  crud = new CrudUtil(this.leads);
  loading: boolean;

  constructor(
    private title: Title,
    private leadService: LeadService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getLeads();
  }

  private _getLeads() {
    this.loading = true;
    this.leadService
      .get()
      .subscribe(leads => {
        this.crud.data = leads;
        this.loading = false;
      });
  }

  delete() {
    this.loading = true;
    this.leadService
      .delete(this.crud.getSelectedItemIds())
      .subscribe(_ => {
        //Refresh data after successfull delete
        this.refresh();
        this.loading = false;
      });
    $('#deleteModal').modal('hide');
    this.crud.resetSelectedItems();
  }

  refresh() {
    this._getLeads();
  }

  onCheckAllRows(value) {
    this.crud.checkAll(value);
  }

  onCheckRow(value, id) {
    this.crud.checkRow(value, id);
  }
}
