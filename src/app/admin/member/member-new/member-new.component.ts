import { Member } from './../member';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.css']
})
export class MemberNewComponent implements OnInit {

  member = new Member();

  constructor(private memberService: MemberService, private location: Location) { }

  ngOnInit() {
  }

  add(member: Member): void {
    this.memberService.add(member).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
