import { expect } from 'chai';
import ingredientsData from '../src/data/ingredients'
import { estimateCostPerIngredient, getIngredientNames } from '../src/ingredients';

describe('ingredient name list', () => {

    it('should return a list of names matching the list of ingredient ids passed', () => {
        let ingredientIDsControlList = [20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145, 2050]
        let knownIngredientList = ['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla']

        let ingredientList = getIngredientNames(ingredientsData, ingredientIDsControlList)

        expect(ingredientList).to.deep.equal(knownIngredientList)
    })
})

describe('estimate cost per ingredient', () => {
    it('should return the cost of an ingredient in cents', () => {
        let testIngredient = {"id": 20081,"quantity": {"amount": 1.5,"unit": "c"}}
        let testCost = 213

        let result = estimateCostPerIngredient(ingredientsData, testIngredient)

        expect(result).to.equal(testCost)
    })
})