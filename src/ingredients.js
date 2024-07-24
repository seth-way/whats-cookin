export const getIngredientNames = (ingredients, ingredientIDs) => {
  const ingredientNamesList = ingredientIDs.map(id => {
    let currentIngredient = ingredients.find(
      ingredient => ingredient.id === id
    );
    if (!currentIngredient) {
      return '';
    }
    return currentIngredient.name;
  });
  return ingredientNamesList.filter(ingredient => ingredient !== '');
};

export const getIngredientsInfo = (ingredients, recipeIngredients) => {
  const updatedIngredients = recipeIngredients.map(ingredient => {
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
  if (!ingredient) {
    return 0;
  }
  let { estimatedCostInCents } = ingredient;
  let amount = recipeIngredient.quantity.amount;
  let cost = estimatedCostInCents * amount;

  return cost;
};
