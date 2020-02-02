import { Ingredient } from "../../shared/models/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListStore } from "src/app/shared/models/shopping-list.store.model";
import { stat } from "fs";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingLitReducer(
  state = initialState, 
  action: ShoppingListActions.ShoppingListActions
  ) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, ingredients: [...state.ingredients, action.ingredient]
      };
      case ShoppingListActions.ADD_INGREDIENTS: {
        return {
          ...state, ingredients: [...state.ingredients, ...action.ingredients]
        };
      }
      default: 
        return state;
  }
}