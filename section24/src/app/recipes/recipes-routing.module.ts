import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeAddedComponent } from './recipe-added/recipe-added.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverGuard } from './recipes-resolver.service';

const routes: Routes = [
    {
        path: '', 
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
