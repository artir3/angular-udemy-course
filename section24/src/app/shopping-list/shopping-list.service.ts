import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.refreshList();
  }

  addIngredients(ingredients: Ingredient[]) {
    // for(let i of ingredients) {
    //   this.addIngredient(i);
    // }
    this.ingredients.push(...ingredients);
    this.refreshList();
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.refreshList();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.refreshList();
  }

  private refreshList() {
    this.ingredientsChanged.next(this.ingredients.slice());

  }
}
