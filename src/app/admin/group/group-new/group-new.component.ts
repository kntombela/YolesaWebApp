import { Group } from './../group';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.css']
})
export class GroupNewComponent implements OnInit {

  pageTitle = 'New Group';
  group = new Group();

  constructor(
    private title: Title,
    private groupService: GroupService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  add(group: Group) {
    this.groupService
      .add(group)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
