import { GroupType } from './../groupTypeEnum';
import { GroupService } from './../group.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../group';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  @Input() group: Group;
  groupType = GroupType;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => this.group = group);
  }
}
