import { expect } from 'chai';
import { ingredientSampleData } from '../src/data/ingredients-sample';
import {
  estimateCostPerIngredient,
  getIngredientNames,
  getIngredientsInfo,
} from '../src/ingredients';

describe('ingredient name list', () => {
  it('should return a list of names matching the list of ingredient ids passed', () => {
    let ingredientIDsControlList = [
      20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047
    ];
    let knownIngredientList = [
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
      'sucrose',
      'instant vanilla pudding',
      'brown sugar',
      'salt',
      'fine sea salt',
    ];

    let ingredientList = getIngredientNames(
      ingredientSampleData,
      ingredientIDsControlList
    );

    expect(ingredientList).to.deep.equal(knownIngredientList);
  });

  it('should give back an empty array if the input is an empty list', () => {
    let ingredientIDsControlList = [];
    let knownIngredientList = [];

    let ingredientList = getIngredientNames(
      ingredientSampleData,
      ingredientIDsControlList
    );

    expect(ingredientList).to.deep.equal(knownIngredientList);
  });

  it('should only return recipe names for valid id\'s', () => {
    let ingredientIDsControlList = [
      20081, 18372, 1123, 19335, 19206, 1933400000, 2047000000, 1012047000000
    ];
    let knownIngredientList = [
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
      'sucrose',
      'instant vanilla pudding',
    ];
    let ingredientList = getIngredientNames(
      ingredientSampleData,
      ingredientIDsControlList
    );

    expect(ingredientList).to.deep.equal(knownIngredientList);
  });
});

describe('get information for recipe ingredient', () => {
  it('should take an array of ingredient from a recipe and it adds each ingredient\'s name and cost', () => {
   const ingredients = [
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
    ]
    const result = [
      {
        id: 20081,
        quantity: {
          amount: 4,
          unit: 'teaspoons',
        },
      name: 'wheat flour',
      estimatedCostInCents: 142
      },
      {
        id: 18372,
        quantity: {
          amount: 8,
          unit: 'tablespoons',
        },
      name: 'bicarbonate of soda',
      estimatedCostInCents: 582,
      },
      {
        id: 1123,
        quantity: {
          amount: 2,
          unit: 'cups',
        },
      name: 'eggs',
      estimatedCostInCents: 472,
      },
      {
        id: 19335,
        quantity: {
          amount: 4,
          unit: 'servings',
        },
      name: 'sucrose',
      estimatedCostInCents: 902,
      },
    ]

    expect(result).to.deep.equal(getIngredientsInfo(ingredientSampleData, ingredients))
  });

  it('should give back an empty array if the input is an empty list', () => {
    const ingredients = [];
    const result = [];

    expect(result).to.deep.equal(getIngredientsInfo(ingredientSampleData, ingredients))
  });
});

describe('estimate cost per ingredient', () => {
  it('should return the cost of an ingredient in cents', () => {
    let testIngredient = { id: 20081, quantity: { amount: 1.5, unit: 'c' } };
    let testCost = 213;

    let result = estimateCostPerIngredient(
      ingredientSampleData,
      testIngredient
    );

    expect(result).to.equal(testCost);
  });

  it('should return 0 if a nonvalid id is passed', () => {
    let testIngredient = { id: 2008100000, quantity: { amount: 1.5, unit: 'c' } };
    let testCost = 0;

    let result = estimateCostPerIngredient(
      ingredientSampleData,
      testIngredient
    );

    expect(result).to.equal(testCost);
  });
});
