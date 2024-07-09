export const getIngredientNames = (ingredientsData, recipeIDs) => {
  const recipeNameList = recipeIDs.map(id => {
    let currentIngredient = ingredientsData.find(
      ingredient => ingredient.id === id
    );
    return currentIngredient.name;
  });
  return recipeNameList;
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
