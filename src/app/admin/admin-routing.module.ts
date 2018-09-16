import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { MemberNewComponent } from './member/member-new/member-new.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './../shared/guard/auth.guard';
import { LeadDetailComponent } from './lead/lead-detail/lead-detail.component';
import { LeadIndexComponent } from './lead/lead-index/lead-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadNewComponent } from './lead/lead-new/lead-new.component';
import { GroupIndexComponent } from './group/group-index/group-index.component';
import { MemberIndexComponent } from './member/member-index/member-index.component';
import { GroupNewComponent } from './group/group-new/group-new.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { LeadEditComponent } from './lead/lead-edit/lead-edit.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AdminComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'lead', component: LeadIndexComponent },
        { path: 'lead/new', component: LeadNewComponent },
        { path: 'lead/detail/:id', component: LeadDetailComponent },
        { path: 'lead/edit/:id', component: LeadEditComponent },
        { path: 'group', component: GroupIndexComponent },
        { path: 'group/new', component: GroupNewComponent },
        { path: 'group/detail/:id', component: GroupDetailComponent },
        { path: 'group/edit/:id', component: GroupEditComponent },
        { path: 'member', component: MemberIndexComponent },
        { path: 'member/new', component: MemberNewComponent },
        { path: 'member/detail/:id', component: MemberDetailComponent },
        { path: 'member/edit/:id', component: MemberEditComponent }
        // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
        // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
        // { path: 'forms', loadChildren: './form/form.module#FormModule' },
        // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
        // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
        // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
        // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
