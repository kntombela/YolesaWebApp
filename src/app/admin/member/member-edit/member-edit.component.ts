import { AddressType } from './../../address/addressTypeEnum';
import { AddressService } from './../../address/address.service';
import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../member';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Location } from '@angular/common';
import { Gender } from '../genderEnum';
import { Title } from '../titleEnum';
import { Address } from '../../address/address';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  pageTitle = 'Edit Member';
  @Input() member: Member;
  @Input() address: Address;
  gender = Gender;
  title = Title;
  addressType = AddressType;
  at = AddressType.Residential;
  memberId = +this.route.snapshot.paramMap.get('id');
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this._getMember();
    this.getAddress(this.memberId, this.at);
  }

  private _getMember() {
    this.loading = true;
    this.memberService
      .getMember(this.memberId)
      .subscribe(member => {
        this.member = member;
        this.loading = false;
      });
  }

  getAddress(memberId: number, addressType: AddressType) {
    this.addressService.getMemberAddress(memberId, addressType)
      .subscribe(address => this.address = address);
  }

  update() {
    this.memberService.update(this.member)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
