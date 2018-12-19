import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group';
import { GroupType } from '../groupTypeEnum';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  pageTitle = 'Edit Group';
  @Input() group: Group;
  groupType = GroupType;
  loading: boolean;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getGroup();
  }

  private _getGroup() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService
      .getGroup(id)
      .subscribe(group => {
        this.group = group;
        this.loading = false;
      });
  }

  update() {
    this.groupService
      .update(this.group)
      .subscribe(_ => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
