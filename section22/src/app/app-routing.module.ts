import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipes',
    // old way where we need tsconfig.json -> "module": "es2015",
    // loadChildren: './recipes/recipes.module#RecipesModule'
    // below is new we where we need tsconfig.json -> "module": "esnext"
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }