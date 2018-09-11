import { AuthService } from './../../../shared/services/auth.service';
import { MemberService } from './../member.service';
import { Component, OnInit } from '@angular/core';
import { CrudUtil } from '../../shared/utils/crudUtil';
import { Member } from '../member';
import { GroupService } from '../../group/group.service';

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
    private memberService: MemberService,
    private groupService: GroupService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(): void {
    if (this.auth.isAdmin) {
      this.memberService.get()
        .subscribe(members => this.crud.data = members);
    } else {
      this.groupService.getGroupByUserId(this.auth.user.general.sub)
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
}
