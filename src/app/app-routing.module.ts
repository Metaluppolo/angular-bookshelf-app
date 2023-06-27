import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookComponent } from './components/book/book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard], children: [
    { path: '', redirectTo:'bookshelf', pathMatch: 'full' },
    { path: 'bookshelf', component: BookshelfComponent, children: [
      { path: 'book', component: BookComponent }
    ] },
    { path: 'profile', component: ProfileComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent }, 
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
