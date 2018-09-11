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

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AdminComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'lead', component: LeadIndexComponent },
        { path: 'lead/new', component: LeadNewComponent },
        { path: 'lead/detail/:id', component: LeadDetailComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'group', component: GroupIndexComponent },
        { path: 'member', component: MemberIndexComponent }
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
