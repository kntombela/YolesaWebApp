import { GroupService } from './../group.service';
import { Group } from './../group';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudUtil } from '../../shared/utils/crudUtil';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/core/utils.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-group-index',
  templateUrl: './group-index.component.html',
  styleUrls: ['./group-index.component.css']
})
export class GroupIndexComponent implements OnInit, OnDestroy {

  pageTitle = 'Group Index';
  groups: Group[];
  crud = new CrudUtil(this.groups);
  loading: boolean;
  groupListSub: Subscription;

  constructor(
    private title: Title,
    private groupService: GroupService,
    public utils: UtilsService, ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.getGroups();
  }

  getGroups(): void {
    this.loading = true;
    this.groupListSub = this.groupService
      .get()
      .subscribe(groups => {
        this.crud.data = groups;
        this.loading = false;
      });
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

  ngOnDestroy() {
    this.groupListSub.unsubscribe();
  }

}
