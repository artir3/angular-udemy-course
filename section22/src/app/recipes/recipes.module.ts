import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeAddedComponent } from './recipe-added/recipe-added.component'
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeAddedComponent,
        RecipeItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RecipesRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
})
export class RecipesModule { }