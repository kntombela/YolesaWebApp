import { CrudUtilService } from './../../shared/utils/crud.util.service';
import { HeaderService } from './../../components/header/header.service';
import { FilterSortService } from './../../../core/filter-sort.service';
import { GroupService } from './../group.service';
import { Group } from './../group';
import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/core/utils.service';

declare var $: any;

@Component({
  selector: 'app-group-index',
  templateUrl: './group-index.component.html',
  styleUrls: ['./group-index.component.css']
})
export class GroupIndexComponent implements OnInit {

  pageTitle = 'Group Index';
  loading: boolean;

  constructor(
    private title: Title,
    private groupService: GroupService,
    public utils: UtilsService,
    public fs: FilterSortService, 
    public headerService: HeaderService,
    public crud: CrudUtilService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getGroups();
  }

  private _getGroups() {
    this.loading = true;
    this.groupService
      .get()
      .subscribe(groups => {
        this.crud.data = groups;
        this.crud.filteredData = groups;
        this.loading = false;
      });
  }

  delete() {
    this.loading = true;
    this.groupService
      .delete(this.crud.getSelectedItemIds())
      .subscribe(_ => {
        //Refresh data after successfull delete
        this.refresh();
        this.loading = false;
      });
    $('#deleteModal').modal('hide');
    this.crud.resetSelectedItems();
  }

  // TODO: Move to CrudUtil service
  // searchGroups() {
  //   this.crud.filteredData = this.fs.search(this.crud.data, this.crud.query, 'id');
  // }

  // resetQuery() {
  //   this.crud.query = '';
  //   this.crud.filteredData = this.crud.data;
  // }

  refresh() {
    this._getGroups();
    this.crud.resetQuery();
  }
}
