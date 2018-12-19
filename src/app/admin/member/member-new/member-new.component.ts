import { Member } from './../member';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.css']
})
export class MemberNewComponent implements OnInit {

  pageTitle = 'New Member';
  member = new Member();

  constructor(
    private title: Title,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  add(member: Member) {
    this.memberService
      .add(member)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
