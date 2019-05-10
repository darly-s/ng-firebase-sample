import { NgModule } from '@angular/core';
import { 
  FormsModule, 
  ReactiveFormsModule
 } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from './services/localstorage.service';
import { AuthService } from './services/auth.service';

import { NotFoundComponent } from './component/not-found/not-found.component';
import { MainHeaderComponent } from './component/main-layout/main-header/main-header.component';

import { OnlyAuthorizedGuard } from './services/only-authorized.guard';
import { OnlyUnauthorizedGuard } from './services/only-unauthorized.guard';



@NgModule({
  declarations: [
    NotFoundComponent, 
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MainHeaderComponent
  ],
  providers: [
    LocalStorageService,
    AuthService,
    OnlyUnauthorizedGuard,
    OnlyAuthorizedGuard
  ]
})
export class SharedModule { }
