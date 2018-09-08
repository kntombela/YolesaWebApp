import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guard/auth.guard';
import { CallbackComponent } from './shared/callback/callback/callback.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
  // { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  // { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
  // { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
  // { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
