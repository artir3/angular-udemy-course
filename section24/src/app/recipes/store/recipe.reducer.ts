import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions'
import { act } from "@ngrx/effects";


export interface State {
    recipes: Recipe[]
}

const initialState = {
    recipes: []
};

export function recipeReducer(
    state = initialState,
    action: RecipeActions.RecipeActions
) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [action.payload]
            }
        }
        case RecipeActions.ADD_RECIPE: {
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        }
        case RecipeActions.UPDATE_RECIPE: {
            const fetechUpdated = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            }

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = fetechUpdated;

            return {
                ...state,
                recipes: updatedRecipes
            }
        }
        case RecipeActions.DELETE_RECIPE: {
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            }
        }
        case RecipeActions.CLEAR_RECIPES: {
            return {
                ...state,
                recipes: []
            }
        }
        default:
            return state;
    }

}

