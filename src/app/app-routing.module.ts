import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from 'src/app/shared/component/not-found/not-found.component';
import { OnlyUnauthorizedGuard } from './shared/services/only-unauthorized.guard';
import { OnlyAuthorizedGuard } from './shared/services/only-authorized.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'system', loadChildren: './system/system.module#SystemModule', canActivate: [OnlyAuthorizedGuard] },
  { path: '', loadChildren: './auth/auth.module#AuthModule', canActivate: [OnlyUnauthorizedGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
