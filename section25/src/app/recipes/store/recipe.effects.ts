import { Actions, ofType, Effect } from '@ngrx/effects';

import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
        ) { }

    @Effect()
    fetechRecipe = this.actions$.pipe(
        ofType(RecipeActions.FETECH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(environment.url + 'recipes.json')
        }), 
        map(recipes => {
            console.log(recipes)
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }),
        map(recipes => {
            console.log(recipes)

            return new RecipeActions.SetRecipes(recipes)
            // this.recipeService.setRecipes(recipes)
        })

    )

    @Effect({ dispatch: false })
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(environment.url + 'recipes.json', recipesState.recipes);
        })
    )
}


