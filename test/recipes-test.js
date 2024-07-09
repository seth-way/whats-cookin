import { expect } from 'chai';
import { findRecipeIngredients } from '../src/recipes';
import recipeData from '../src/data/recipes'


describe('find ingredients', () => {
  it('should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
    });
    
    it('should find the list of ingredient ids for a given recipe', () => {
      let recipeID = 595736
      let ingredientIDsControlList = [20081, 18372, 1123, 19335, 19206, 19334, 2047, 1012047, 10019903, 1145, 2050]
      
      let ingredientIDsList = findRecipeIngredients(recipeData, recipeID)
      
      expect(ingredientIDsList).to.deep.equal(ingredientIDsControlList)
    })
})