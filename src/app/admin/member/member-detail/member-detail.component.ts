import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Location } from '@angular/common';
import { Member } from '../member';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  pageTitle = 'Member Detail';
  @Input() member: Member;
  loading: boolean;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getMember();
  }

  private _getMember() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService
      .getMember(id)
      .subscribe(member => {
        this.member = member,
          this.loading = false;
      });
  }

  goBack() {
    this.location.back();
  }
}
