//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later!
import { estimateCostPerIngredient } from './ingredients';
import ingredientsData from './data/ingredients';

export const findRecipeIngredients = (recipesList, recipeID) => {
  let recipe = recipesList.find(currentRecipe => currentRecipe.id === recipeID);
  let recipeIngredients = recipe.ingredients;
  let ingredientList = recipeIngredients.map(ingredient => ingredient.id);

  return ingredientList;
};

export const estimateCostPerRecipeIngredients = (ingredientsData, recipe) => {
  return recipe.ingredients.map(ingredient =>
    estimateCostPerIngredient(ingredientsData, ingredient)
  );
};

export const estimateCostPerRecipe = () => {};
