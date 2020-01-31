import { Ingredient } from "../shared/ingredient.model";

const initialState = { 
    ingredient: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingLitReducer(section = initialState, action) {
    
}