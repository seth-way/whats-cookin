import { expect } from 'chai';
import {
  findRecipeIngredients,
  findRecipeInstructions,
  estimateCostPerRecipe,
  estimateCostPerRecipeIngredients,
  filterRecipesByTag,
  filterRecipesByName,
} from '../src/recipes';

import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';

const testRecipe = recipeData[0];

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

    const ingredientIDsList = findRecipeIngredients(recipeData, testRecipe);

    expect(ingredientIDsList).to.deep.equal(ingredientIDsControlList);
  });
});

describe("find a recipe's instructions", () => {
  it('should be a function', () => {
    expect(findRecipeInstructions).to.be.a('function');
  });

  it('should list the instructions for a given recipe', () => {
    const controlInstructions = [
      'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
      'Add egg and vanilla and mix until combined.',
      'Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
      'Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.',
      'Bake for 9 to 10 minutes, or until you see the edges start to brown.',
      'Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.',
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
