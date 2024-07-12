export const getIngredientNames = (ingredientsData, ingredientIDs) => {
  const ingredientNamesList = ingredientIDs.map(id => {
    let currentIngredient = ingredientsData.find(
      ingredient => ingredient.id === id
    );
    return currentIngredient.name;
  });
  return ingredientNamesList;
};

export const getIngredientsInfo = (ingredientsData, ingredients) => {
  const updatedIngredients = ingredients.map(ingredient => {
    const ingredientInfo = ingredientsData.find(
      currentIngredient => currentIngredient.id === ingredient.id
    );
    ingredient.name = ingredientInfo.name;
    ingredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents;
    
    return ingredient;
  });

  return updatedIngredients;
};

export const estimateCostPerIngredient = (
  ingredientsData,
  recipeIngredient
) => {
  // const unitCost = 0
  let ingredient = ingredientsData.find(
    currentIngredient => recipeIngredient.id === currentIngredient.id
  );
  let { estimatedCostInCents } = ingredient;
  let amount = recipeIngredient.quantity.amount;
  let cost = estimatedCostInCents * amount;

  return cost;
};
