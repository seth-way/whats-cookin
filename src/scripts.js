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

console.log(ingredientsData);
// findRecipeIngredients("Dirty Steve's Original Wing Sauce")
// displayRecipes();

window.addEventListener('load', () => {
  var drawer = document.querySelector('#recipeDrawer');
  //drawer.style.height = '100%';
  document.body.addEventListener('click', () => {
    drawer.classList.toggle('unhide');
  });
  console.log('drawer: ', drawer);
});
