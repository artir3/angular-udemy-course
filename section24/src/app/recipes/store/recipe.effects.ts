import { Actions, ofType, Effect } from '@ngrx/effects';

import * as RecipeActions from './recipe.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient) { }

    @Effect()
    fetechRecipe = this.actions$.pipe(
        ofType(RecipeActions.FETECH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(environment.url + 'recipes.json')
        }), 
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes)
            // this.recipeService.setRecipes(recipes)
        })

    )
}


