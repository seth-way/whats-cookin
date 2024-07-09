import { estimateCostPerIngredient } from './ingredients';

export const findRecipeIngredients = (recipesList, recipeID) => {
  const recipe = recipesList.find(
    currentRecipe => currentRecipe.id === recipeID
  );
  const recipeIngredients = recipe.ingredients;
  const ingredientList = recipeIngredients.map(ingredient => ingredient.id);

  return ingredientList;
};

export const findRecipeInstructions = (recipesList, recipeID) => {
  const recipe = recipesList.find(
    currentRecipe => currentRecipe.id === recipeID
  );
  const recipeInstructions = recipe.instructions.sort(
    (a, b) => a.number - b.number
  );

  return recipeInstructions.map(instructionData => instructionData.instruction);
};

export const estimateCostPerRecipeIngredients = (ingredientsData, recipe) => {
  return recipe.ingredients.map(ingredient =>
    estimateCostPerIngredient(ingredientsData, ingredient)
  );
};

export const estimateCostPerRecipe = ingredientCosts => {
  return ingredientCosts.reduce((acc, val) => (acc += val), 0);
};

export const filterRecipesByTag = (recipesList, tag) => {
  return recipesList.filter(recipe => recipe.tags.includes(tag));
};

export const filterRecipesByName = (recipesList, tag) => {
  return recipesList.filter(recipe =>
    recipe.name.toLowerCase().includes(tag.toLowerCase())
  );
};
