import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SLActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 'A super tasty schnitzel', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Frise', 20)
  //     ]),
  //   new Recipe('Big Fat Burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/570px-RedDot_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  recipeChanged = new Subject<Recipe[]>();

  constructor(
    private store: Store<fromApp.AppState>
    ) { }

  getRecipes() {
    return this.recipes.slice();
    //this return only copy of list, no reference
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new SLActions.AddIngredients(ingredients))
    // this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.refreshList();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.refreshList();
  }

  private refreshList() {
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.refreshList();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.refreshList();
  }
}
