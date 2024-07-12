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

const recipesContainer = document.querySelector('.recipes-container')

console.log(ingredientsData);
// findRecipeIngredients("Dirty Steve's Original Wing Sauce")
// displayRecipes();

window.addEventListener('load', () => {
  var drawer = document.getElementById('recipe-drawer');
  //drawer.style.height = '100%';
  // document.body.addEventListener('click', () => {
  //   drawer.classList.toggle('unhide');
  // });
  console.log('drawer: ', drawer);
});

recipesContainer.addEventListener('click', (event) => {
  const recipeCard = event.target.closest('figure')
  console.log(recipeCard)
  if (recipeCard) {
    // must create a recipe card and populate featured recipe section with clicked card
  }
  
  // drawer.classList.toggle('unhide');
});