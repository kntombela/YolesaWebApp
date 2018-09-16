import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group';
import { GroupType } from '../groupTypeEnum';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

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

  update(): void {
    this.groupService.update(this.group)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
