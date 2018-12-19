import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../core/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
