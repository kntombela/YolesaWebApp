import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { LeadService } from './admin/lead/lead.service';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './shared/callback/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    LeadService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
