import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeAddedComponent } from './recipes/recipe-added/recipe-added.component';

const routes: Routes = [
    { path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeAddedComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeAddedComponent },
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  ]  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }