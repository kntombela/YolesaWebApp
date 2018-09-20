import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LeadIndexComponent } from './lead/lead-index/lead-index.component';
import { LeadDetailComponent } from './lead/lead-detail/lead-detail.component';
import { FormsModule } from '@angular/forms';
import { LeadNewComponent } from './lead/lead-new/lead-new.component';
import { MessageComponent } from './components/messages/message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupIndexComponent } from './group/group-index/group-index.component';
import { MemberIndexComponent } from './member/member-index/member-index.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupNewComponent } from './group/group-new/group-new.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberNewComponent } from './member/member-new/member-new.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { LeadEditComponent } from './lead/lead-edit/lead-edit.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { AddressEditComponent } from './address/address-edit/address-edit.component';
import { EnumPipe } from './shared/pipes/enum.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent, 
    DashboardComponent, 
    SidebarComponent, 
    HeaderComponent, 
    LeadIndexComponent, 
    LeadDetailComponent, 
    LeadNewComponent, 
    MessageComponent, 
    ProfileComponent, 
    GroupIndexComponent, 
    MemberIndexComponent, 
    GroupDetailComponent, 
    GroupNewComponent, 
    MemberDetailComponent, 
    MemberNewComponent, 
    GroupEditComponent, 
    LeadEditComponent, 
    MemberEditComponent, 
    AddressEditComponent, 
    EnumPipe
  ]
})
export class AdminModule { }
