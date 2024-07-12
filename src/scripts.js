//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/hamburger.svg';
import ingredientsData from './data/ingredients';
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { findRecipeIngredients } from './recipes';
import { displayRecipes } from './domUpdates';

const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipe = document.querySelector('#featured-recipe');

console.log(ingredientsData);
// findRecipeIngredients("Dirty Steve's Original Wing Sauce")
// displayRecipes();

recipesContainer.addEventListener('click', event => {
  const recipeCard = event.target.closest('figure');
  if (recipeCard) {
    // must create a recipe card and populate featured recipe section with clicked card
    featuredRecipe.classList.add('unhide');
  }
});
