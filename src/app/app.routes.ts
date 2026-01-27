import { Routes } from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: NotFoundComponent},
];
