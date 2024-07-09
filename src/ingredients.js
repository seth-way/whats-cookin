export const getIngredientNames = (ingredientsData, recipeIDs) => {
    const recipeNameList = recipeIDs.map((id) => {
        let currentIngredient = ingredientsData.find((ingredient) => ingredient.id === id)
        return currentIngredient.name
    })
    return recipeNameList
}