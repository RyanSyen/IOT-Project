import { Subscription } from 'rxjs';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { RealTimeDBComponent } from './component/real-time-db/real-time-db.component';
import { TestComponent } from './component/test/test.component';
import { SidemenuComponent } from './component/sidemenu/sidemenu.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'testRDB',
    component: RealTimeDBComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sidemenu',
    component: SidemenuComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'signin',
  //   component: SignInComponent
  // },
];

export let browserRefresh = false;

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  subscription: Subscription;
  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
