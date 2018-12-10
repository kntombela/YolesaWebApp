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

  pageTitle = 'Member';
  groupId: number;
  members: Member[];
  crud = new CrudUtil(this.members);

  constructor(
    private title: Title,
    private memberService: MemberService,
    private groupService: GroupService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.getMembers();
  }

  getMembers(): void {
    if (this.auth.isAdmin) {
      this.memberService.get()
        .subscribe(members => this.crud.data = members);
    } else {
      this.groupService.getGroupByUserId(this.auth.userProfile.user_id)
        .subscribe(
          group => this.memberService.getMembersByGroupID(group.id)
            .subscribe(members => this.crud.data = members)
        );
    }
  }

  onCheckAllRows(value) {
    this.crud.checkAll(value);
  }

  onCheckRow(value, id) {
    this.crud.checkRow(value, id);
  }

  refresh() {
    this.getMembers();
  }

  delete(): void {
    this.memberService.delete(this.crud.getSelectedItemIds()).subscribe(response => {
      this.getMembers(); //Refresh of data can only happen once data is available => async
    });
    $('#deleteModal').modal('hide');
    this.crud.resetSelectedItems();
  }
}
