import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
    { path: 'recipes', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  ]  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }