import { GroupService } from './../group.service';
import { Group } from './../group';
import { Component, OnInit } from '@angular/core';
import { CrudUtil } from '../../shared/utils/crudUtil';
declare var $: any;

@Component({
  selector: 'app-group-index',
  templateUrl: './group-index.component.html',
  styleUrls: ['./group-index.component.css']
})
export class GroupIndexComponent implements OnInit {

  pageTitle = 'Group';
  groups: Group[];
  crud = new CrudUtil(this.groups);

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.get()
      .subscribe(groups => this.crud.data = groups);
  }

  onCheckAllRows(value) {
    this.crud.checkAll(value);
  }

  onCheckRow(value, id) {
    this.crud.checkRow(value, id);
  }

  refresh() {
    this.getGroups();
  }

  delete(): void {
    this.groupService.delete(this.crud.getSelectedItemIds()).subscribe(response => {
      this.getGroups(); //Refresh of data can only happen once data is available => async
    });
    $('#deleteModal').modal('hide');
    this.crud.resetSelectedItems();
  }
}
