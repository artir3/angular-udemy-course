import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const CLEAR_RECIPES = '[Recipes] Clear Recipes';
export const FETECH_RECIPES = '[Recipes] Fetech Recipes';

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) { }
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: { index: number, newRecipe: Recipe }) { }
}

export class ClearRecipes implements Action {
    readonly type = CLEAR_RECIPES;
}

export class FetechRecipes implements Action {
    readonly type = FETECH_RECIPES;
}

export type RecipeActions =
    | SetRecipes
    | AddRecipe
    | UpdateRecipe
    | DeleteRecipe
    | ClearRecipes
    | FetechRecipes
    ;



