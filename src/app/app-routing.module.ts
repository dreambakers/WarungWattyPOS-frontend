import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './dashboard/manage/manage.component';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['']);
const redirectLoggedInToItems = redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'signup', component: SignupComponent, ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'dashboard', ...canActivate(redirectUnauthorizedToLanding) , component: DashboardComponent, children: [
      {
        path: 'manage', component: ManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
