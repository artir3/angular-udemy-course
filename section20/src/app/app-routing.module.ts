import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeAddedComponent } from './recipes/recipe-added/recipe-added.component';
import { RecipesResolverGuard } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth/auth.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeAddedComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverGuard]
      },
      {
        path: ':id/edit',
        component: RecipeAddedComponent,
        resolve: [RecipesResolverGuard]
      },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }