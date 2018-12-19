import { UtilsService } from './../../../core/utils.service';
import { AuthService } from './../../../shared/services/auth.service';
import { MemberService } from './../member.service';
import { Component, OnInit } from '@angular/core';
import { CrudUtil } from '../../shared/utils/crudUtil';
import { Member } from '../member';
import { GroupService } from '../../group/group.service';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-member-index',
  templateUrl: './member-index.component.html',
  styleUrls: ['./member-index.component.css']
})
export class MemberIndexComponent implements OnInit {

  pageTitle = 'Member Index';
  members: Member[];
  crud = new CrudUtil(this.members);
  loading: boolean;

  constructor(
    private title: Title,
    private memberService: MemberService,
    private groupService: GroupService,
    private auth: AuthService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getMembers();
  }

  private _getMembers() {
    this.loading = true;
    // Only users with admin role have access to all members
    if (this.auth.isAdmin) {
      this.memberService
        .get()
        .subscribe(members => {
          this.crud.data = members;
          this.loading = false;
        });
    } else {
      this.groupService
        .getGroupByUserId(this.auth.userProfile.user_id)
        .subscribe(
          group => this.memberService
            .getMembersByGroupID(group.id)
            .subscribe(members => {
              this.crud.data = members;
              this.loading = false;
            })
        );
    }
  }

  delete() {
    this.loading = true;
    this.memberService
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
    this._getMembers();
  }

  onCheckAllRows(value) {
    this.crud.checkAll(value);
  }

  onCheckRow(value, id) {
    this.crud.checkRow(value, id);
  }
}
