import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './component/home/home.component';
import { RealTimeDBComponent } from './component/real-time-db/real-time-db.component';
import { TestComponent } from './component/test/test.component';
import { SidemenuComponent } from './component/sidemenu/sidemenu.component';
import { SignInComponent } from './component/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'testRDB',
    component: RealTimeDBComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'sidemenu',
    component: SidemenuComponent
  },
  // {
  //   path: 'signin',
  //   component: SignInComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
