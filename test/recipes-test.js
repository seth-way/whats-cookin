import { expect } from 'chai';
import { findRecipeIngredients } from '../src/recipes';
import recipeData from '../src/data/recipes'

describe('Recipe', () => {
  it('Should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });

  it('should find the list of ingredients for a given recipe', () => {
    let recipeID = 595736
    let ingredientsControlList = [20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145, 2050]

    let ingredientsList = findRecipeIngredients(recipeData, recipeID)

    expect(ingredientsList).to.deep.equal(ingredientsControlList)
  })
})