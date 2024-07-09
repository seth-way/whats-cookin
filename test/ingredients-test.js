import { expect } from 'chai';
import ingredientsData from '../src/data/ingredients'
import { getIngredientNames } from '../src/ingredients';

describe('ingredient name list', () => {

    it('should return a list of names matching the list of ingredient ids passed', () => {
        let ingredientIDsControlList = [20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145, 2050]
        let knownIngredientList = ['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla']

        let ingredientList = getIngredientNames(ingredientsData, ingredientIDsControlList)

        expect(ingredientList).to.deep.equal(knownIngredientList)
    })
})