import { expect } from 'chai';
import {
  findRecipeIngredients,
  findRecipeInstructions,
  estimateCostPerRecipe,
  estimateCostPerRecipeIngredients,
  updateRecipeWithCost,
  updateAllRecipesWithCost,
  filterRecipesByCost,
  filterRecipesByTag,
  filterRecipesByName,
} from '../src/recipes';
import {
  recipeSampleData,
  recipesWithSauceTag,
  recipesWithSideDishTag,
} from '../src/data/recipes-sample';
import { ingredientSampleData } from '../src/data/ingredients-sample';

const testRecipe = recipeSampleData[0];

describe("find a recipe's ingredients", () => {
  it('should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });

  it('should find the list of ingredient ids for a given recipe', () => {
    const recipeID = 412309;
    const ingredientIDsControlList = [20081, 18372, 1123, 19335];
    
    const ingredientIDsList = findRecipeIngredients(testRecipe);

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

describe('update the recipe object to include the total cost of that recipe', () => {
  it('should take a recipe and ingredients data then update the recipe with the cost', () => {
    const recipe = {
      id: 412309,
      image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 4,
            unit: 'teaspoons',
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 8,
            unit: 'tablespoons',
          },
        },
        {
          id: 1123,
          quantity: {
            amount: 2,
            unit: 'cups',
          },
        },
        {
          id: 19335,
          quantity: {
            amount: 4,
            unit: 'servings',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
          number: 1,
        },
      ],
      name: "Dirty Steve's Original Wing Sauce",
      tags: ['sauce'],
    };

    const updatedRecipe = {
      id: 412309,
      image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 4,
            unit: 'teaspoons',
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 8,
            unit: 'tablespoons',
          },
        },
        {
          id: 1123,
          quantity: {
            amount: 2,
            unit: 'cups',
          },
        },
        {
          id: 19335,
          quantity: {
            amount: 4,
            unit: 'servings',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
          number: 1,
        },
      ],
      name: "Dirty Steve's Original Wing Sauce",
      tags: ['sauce'],
      totalCost: 97.76
    }

    expect(updateRecipeWithCost(ingredientSampleData, recipe)).to.deep.equal(updatedRecipe)
  });
});

describe('update all recipe objects to include the total cost of each recipe', () => {
  it('should take recipe array and ingredients data then update each recipe with the cost', () => {
    const allRecipes = [
      {
        id: 412309,
        image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 4,
              unit: 'teaspoons',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ['sauce'],
      },
      {
        id: 741603,
        image: 'https://spoonacular.com/recipeImages/741603-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction: 'Watch how to make this recipe.',
            number: 1,
          },
        ],
        name: 'Elvis Pancakes',
        tags: ['side dish'],
      },
      {
        id: 562334,
        image: 'https://spoonacular.com/recipeImages/562334-556x370.jpg',
        ingredients: [
          {
            id: 18372,
            quantity: {
              amount: 0.75,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Grease or spray oil a 9×5 inch loaf pan.Preheat oven to 170 – 200°F (lowest possible).',
            number: 1,
          },
        ],
        name: 'Mock Udi’s Gluten Free Whole Grain Bread',
        tags: ['sauce'],
      },
    ];

    const updatedRecipes = [
      {
        id: 412309,
        image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 4,
              unit: 'teaspoons',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ['sauce'],
        totalCost: 5.68
      },
      {
        id: 741603,
        image: 'https://spoonacular.com/recipeImages/741603-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction: 'Watch how to make this recipe.',
            number: 1,
          },
        ],
        name: 'Elvis Pancakes',
        tags: ['side dish'],
        totalCost: 1.42
      },
      {
        id: 562334,
        image: 'https://spoonacular.com/recipeImages/562334-556x370.jpg',
        ingredients: [
          {
            id: 18372,
            quantity: {
              amount: 0.75,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Grease or spray oil a 9×5 inch loaf pan.Preheat oven to 170 – 200°F (lowest possible).',
            number: 1,
          },
        ],
        name: 'Mock Udi’s Gluten Free Whole Grain Bread',
        tags: ['sauce'],
        totalCost: 4.37
      },
    ];

    expect(updateAllRecipesWithCost(ingredientSampleData, allRecipes)).to.deep.equal(updatedRecipes);
  });
});

describe('filter recipes by a min and a max cost', () => {
  it('should remove recipes outside of the min and max range', () => {
    const recipes = [
      {
        id: 412309,
        image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 4,
              unit: 'teaspoons',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ['sauce'],
        totalCost: 5.68
      },
      {
        id: 741603,
        image: 'https://spoonacular.com/recipeImages/741603-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction: 'Watch how to make this recipe.',
            number: 1,
          },
        ],
        name: 'Elvis Pancakes',
        tags: ['side dish'],
        totalCost: 1.42
      },
      {
        id: 562334,
        image: 'https://spoonacular.com/recipeImages/562334-556x370.jpg',
        ingredients: [
          {
            id: 18372,
            quantity: {
              amount: 0.75,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Grease or spray oil a 9×5 inch loaf pan.Preheat oven to 170 – 200°F (lowest possible).',
            number: 1,
          },
        ],
        name: 'Mock Udi’s Gluten Free Whole Grain Bread',
        tags: ['sauce'],
        totalCost: 4.37
      },
    ];

    const filteredRecipes = [
      {
        id: 412309,
        image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 4,
              unit: 'teaspoons',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ['sauce'],
        totalCost: 5.68
      },
      {
        id: 562334,
        image: 'https://spoonacular.com/recipeImages/562334-556x370.jpg',
        ingredients: [
          {
            id: 18372,
            quantity: {
              amount: 0.75,
              unit: 'cup',
            },
          },
        ],
        instructions: [
          {
            instruction:
              'Grease or spray oil a 9×5 inch loaf pan.Preheat oven to 170 – 200°F (lowest possible).',
            number: 1,
          },
        ],
        name: 'Mock Udi’s Gluten Free Whole Grain Bread',
        tags: ['sauce'],
        totalCost: 4.37
      },
    ];

    expect(filterRecipesByCost(recipes, 4.00, 10.00)).to.deep.equal(filteredRecipes)
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
