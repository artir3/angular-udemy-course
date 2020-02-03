import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipe.actions'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.url + 'recipes.json', recipes)
      .subscribe();
  }

  fetechRecipes() {

    return this.http.get<Recipe[]>(environment.url + 'recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
        tap(recipes => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes))
          // this.recipeService.setRecipes(recipes)
        })
      );
  }
}
