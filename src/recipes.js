//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

export const findRecipeIngredients = (recipesList, recipeID) => {

  let recipe = recipesList.find((currentRecipe) => currentRecipe.id === recipeID)
  let recipeIngredients = recipe.ingredients
  let ingredientList = recipeIngredients.map((ingredient) => ingredient.id)

  return ingredientList
}