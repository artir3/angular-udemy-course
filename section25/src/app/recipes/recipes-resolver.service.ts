import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesResolverGuard implements Resolve<Recipe[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => recipesState.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipeActions.FetechRecipes())
                    return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES),
                        take(1)
                    );
                }
                return of(recipes);
            })
        )
    }
}
