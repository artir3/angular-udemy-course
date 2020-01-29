import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [ AuthGuard ] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }