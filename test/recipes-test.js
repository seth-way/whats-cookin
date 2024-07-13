import { expect } from 'chai';
import {
  findRecipeIngredients,
  findRecipeInstructions,
  estimateCostPerRecipe,
  estimateCostPerRecipeIngredients,
  filterRecipesByTag,
  filterRecipesByName,
} from '../src/recipes';
import {
  recipeSampleData,
  recipesWithSauceTag,
  recipesWithSideDishTag,
} from '../src/data/recipes-sample';
import { ingredientSampleData } from '../src/data/ingredients-sample';
// import ingredientsData from '../src/data/ingredients';
// import recipeData from '../src/data/recipes';

const testRecipe = recipeSampleData[0];

describe("find a recipe's ingredients", () => {
  it('should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });

  it('should find the list of ingredient ids for a given recipe', () => {
    const recipeID = 412309;
    const ingredientIDsControlList = [20081, 18372, 1123, 19335];

    const ingredientIDsList = findRecipeIngredients(
      recipeSampleData,
      testRecipe
    );

    expect(ingredientIDsList).to.deep.equal(ingredientIDsControlList);
  });
});

describe("find a recipe's instructions", () => {
  it('should be a function', () => {
    expect(findRecipeInstructions).to.be.a('function');
  });

  it('should list the instructions for a given recipe', () => {
    const controlInstructions = [
      'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
    ];

    const resultInstructions = findRecipeInstructions(testRecipe);

    expect(controlInstructions).to.deep.equal(resultInstructions);
  });
});

describe('estimate recipe ingredients costs', () => {
  it('should be a function', () => {
    expect(estimateCostPerRecipeIngredients).to.be.a('function');
  });

  it('should take a recipe and return an array of the cost per ingredient', () => {
    const testRecipeIngredientCosts = [568, 4656, 944, 3608];

    const resultCosts = estimateCostPerRecipeIngredients(
      ingredientSampleData,
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

    const testTotal = 177.76;
    const recipeTotal = estimateCostPerRecipe(testRecipeIngredientCosts);
    expect(recipeTotal).to.equal(testTotal);
  });
});

describe('filter recipes list by tag', () => {
  it('should be a function', () => {
    expect(filterRecipesByTag).to.be.a('function');
  });

  it('should filter recipes list to only include those with the given tag', () => {
    const filteredRecipes = filterRecipesByTag(recipeSampleData, 'sauce');

    expect(filteredRecipes.length).to.equal(2);
    expect(filteredRecipes).to.deep.equal(recipesWithSauceTag);
  });

  it('should work on any tag', () => {
    const filteredRecipes2 = filterRecipesByTag(recipeSampleData, 'side dish');

    expect(filteredRecipes2.length).to.equal(1);
    expect(filteredRecipes2).to.deep.equal(recipesWithSideDishTag);
  });
});

describe('filter recipes list by recipe name', () => {
  it('should be a function', () => {
    expect(filterRecipesByName).to.be.a('function');
  });

  it('should filter recipes list to only include those whose name includes given string', () => {
    const filteredRecipes = filterRecipesByName(recipeSampleData, 'wing');

    expect(filteredRecipes).to.deep.equal([recipeSampleData[0]]);
  });

  it('should work on any name', () => {
    const filteredRecipes = filterRecipesByName(recipeSampleData, 'wing');
    const filteredRecipes2 = filterRecipesByName(recipeSampleData, 'grain');

    expect(filteredRecipes).to.deep.equal([recipeSampleData[0]]);
    expect(filteredRecipes2).to.deep.equal([recipeSampleData[2]]);
  });
});
