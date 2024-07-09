import { expect } from 'chai';
import {
  findRecipeIngredients,
  findRecipeInstructions,
  estimateCostPerRecipe,
  estimateCostPerRecipeIngredients,
  filterRecipesByTag,
  filterRecipesByName,
} from '../src/recipes';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe("find a recipe's ingredients", () => {
  it('should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });

  it('should find the list of ingredient ids for a given recipe', () => {
    const recipeID = 595736;
    const ingredientIDsControlList = [
      20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145,
      2050,
    ];

    const ingredientIDsList = findRecipeIngredients(recipeData, recipeID);

    expect(ingredientIDsList).to.deep.equal(ingredientIDsControlList);
  });
});

describe("find a recipe's instructions", () => {
  it('should be a function', () => {
    expect(findRecipeInstructions).to.be.a('function');
  });

  it('should find the list of ingredient ids for a given recipe', () => {
    const recipeID = 741603;
    const controlInstructions = [
      'Watch how to make this recipe.',
      'In a large bowl, whisk together buttermilk, eggs, baking powder, sugar, salt and butter.',
      'In another large bowl mix together all-purpose flour and buckwheat flour.',
      'Slowly add flour into the wet ingredients mixing with a whisk.',
      'Mix until there are no lumps and the batter is smooth and velvety.',
      'In a large cast iron skillet or flat grill pan over medium-high heat, melt a tablespoon of butter. Ladle pancake batter onto skillet to desired size. Using the ladle, form pancake into circular shape. Cook on each side for 2 to 3 minutes or until golden brown. Set pancakes aside and keep warm. Repeat with remaining ingredients.',
      'Once completed, spread peanut butter on a pancake, layer it with sliced bananas and drizzle it with honey. Top the pancake with another pancake to form a sandwich. Repeat with remaining pancakes and serve with extra honey.',
    ];

    const resultInstructions = findRecipeInstructions(recipeData, recipeID);

    expect(controlInstructions).to.deep.equal(resultInstructions);
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
  });
});

describe('filter recipes list by tag', () => {
  it('should be a function', () => {
    expect(filterRecipesByTag).to.be.a('function');
  });

  it('should filter recipes list to only include those with the given tag', () => {
    const filteredRecipes = filterRecipesByTag(recipeData, 'antipasti');

    expect(filteredRecipes.length).to.equal(9);
  });

  it('should work on any tag', () => {
    const filteredRecipes = filterRecipesByTag(recipeData, 'antipasti');
    const filteredRecipes2 = filterRecipesByTag(recipeData, 'lunch');

    expect(filteredRecipes.length).to.equal(9);
    expect(filteredRecipes2.length).to.equal(12);
  });
});

describe('filter recipes list by recipe name', () => {
  it('should be a function', () => {
    expect(filterRecipesByName).to.be.a('function');
  });

  it('should filter recipes list to only include those whose name includes given string', () => {
    const filteredRecipes = filterRecipesByName(recipeData, 'cookie');

    expect(filteredRecipes.length).to.equal(6);
  });

  it('should work on any name', () => {
    const filteredRecipes = filterRecipesByName(recipeData, 'cookie');
    const filteredRecipes2 = filterRecipesByName(recipeData, 'salad');

    expect(filteredRecipes.length).to.equal(6);
    expect(filteredRecipes2.length).to.equal(4);
  });
});
