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
    GroupIndexComponent
  ]
})
export class AdminModule { }
