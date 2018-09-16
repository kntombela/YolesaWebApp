import { Group } from './../group';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.css']
})
export class GroupNewComponent implements OnInit {

  group = new Group();

  constructor(private groupService: GroupService, private location: Location) { }

  ngOnInit() {
  }

  add(group: Group): void {
    this.groupService.add(group).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
