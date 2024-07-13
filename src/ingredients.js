export const getIngredientNames = (ingredients, ingredientIDs) => {
  const ingredientNamesList = ingredientIDs.map(id => {
    let currentIngredient = ingredients.find(
      ingredient => ingredient.id === id
    );
    return currentIngredient.name;
  });
  return ingredientNamesList;
};

export const getIngredientsInfo = (ingredients, ingredientIDs) => {
  const updatedIngredients = ingredientIDs.map(ingredient => {
    const ingredientInfo = ingredients.find(
      currentIngredient => currentIngredient.id === ingredient.id
    );
    ingredient.name = ingredientInfo.name;
    ingredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents;

    return ingredient;
  });

  return updatedIngredients;
};

export const estimateCostPerIngredient = (ingredients, recipeIngredient) => {
  // const unitCost = 0
  let ingredient = ingredients.find(
    currentIngredient => recipeIngredient.id === currentIngredient.id
  );
  let { estimatedCostInCents } = ingredient;
  let amount = recipeIngredient.quantity.amount;
  let cost = estimatedCostInCents * amount;

  return cost;
};
