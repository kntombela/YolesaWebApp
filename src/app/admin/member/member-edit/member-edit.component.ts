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

  @Input() member: Member;
  @Input() address: Address;
  gender = Gender;
  title = Title;
  addressType = AddressType;
  at = AddressType.Residential;
  memberId = +this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getMember();
    this.getAddress(this.memberId, this.at);
  }

  getMember(): void {
    this.memberService.getMember(this.memberId)
      .subscribe(
        member => this.member = member
      );
  }

  getAddress(memberId: number, addressType: AddressType): void {
    this.addressService.getMemberAddress(memberId, addressType)
      .subscribe(address => this.address = address);
  }

  update(): void {
    this.memberService.update(this.member)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
