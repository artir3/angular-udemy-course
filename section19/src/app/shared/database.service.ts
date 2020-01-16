import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.url + 'recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  fetechRecipes() {
    this.http.get<Recipe[]>(environment.url + 'recipes.json')
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
