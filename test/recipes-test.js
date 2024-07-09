import { expect } from 'chai';
import {
  findRecipeIngredients,
  estimateCostPerRecipe,
  estimateCostPerRecipeIngredients,
} from '../src/recipes';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('find ingredients', () => {
  it('should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });

  it('should find the list of ingredient ids for a given recipe', () => {
    let recipeID = 595736;
    let ingredientIDsControlList = [
      20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145,
      2050,
    ];

    let ingredientIDsList = findRecipeIngredients(recipeData, recipeID);

    expect(ingredientIDsList).to.deep.equal(ingredientIDsControlList);
  });
});

describe('estimate recipe ingredients costs', () => {
  it('should be a function', () => {
    expect(estimateCostPerRecipeIngredients).to.be.a('function');
  });

  it('should take a recipe and return an array of the cost per ingredient', () => {
    const testRecipe = recipeData[0];
    const testRecipeIngredientCosts = [
      213, 291, 472, 451, 1980, 279.5, 140, 12672, 506, 308.5, 463,
    ];

    const resultCosts = estimateCostPerRecipeIngredients(
      ingredientsData,
      testRecipe
    );

    expect(resultCosts).to.deep.equal(testRecipeIngredientCosts);
  });
});

describe('estimate recipe total cost', () => {
  it('should be a function', () => {
    expect(estimateCostPerRecipe).to.be.a('function');
  });

  it('should take a list of ingredient costs and return a total recipe cost', () => {
    const testRecipeIngredientCosts = [
      213, 291, 472, 451, 1980, 279.5, 140, 12672, 506, 308.5, 463,
    ];

    const testTotal = 17776;
    const recipeTotal = estimateCostPerRecipe(testRecipeIngredientCosts);

    expect(recipeTotal).to.equal(testTotal);
  })
});
