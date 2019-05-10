import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SystemComponent } from './system.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    SystemComponent,
    HomeComponent
  ],
  imports: [
    SystemRoutingModule,
    CommonModule,
    SharedModule
  ],

  providers: [
    
  ],
})
export class SystemModule { }
