import { Ingredient } from "../../shared/models/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: ShoppingListStore
}

export interface ShoppingListStore{ 
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: ShoppingListStore = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingLitReducer(
  state: ShoppingListStore = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state, ingredients: [...state.ingredients, ...action.payload]
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENTS: {
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        // we copy whole old object, then we override only that variables what we need.
        // So if we have id in old object we keep it, but we override other variables
        ...ingredient, ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state, ingredients: updatedIngredients
      };
    }
    case ShoppingListActions.DELETE_INGREDIENTS: {
      return {
        ...state, ingredients: state.ingredients.filter((ig, index) => {
          return index !== action.payload;
        })
      };
    }
    default:
      return state;
  }
}