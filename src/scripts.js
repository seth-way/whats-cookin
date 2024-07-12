//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
// --- // Images // --- //
import './images/turing-logo.png';
import './images/hamburger.svg';
// --- // Images // --- //
import ingredientsData from './data/ingredients';
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { findRecipeIngredients } from './recipes';
import { displayRecipes } from './domUpdates';

const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipe = document.getElementById('featured-recipe');
// --- // Buttons // --- //
const closeFeaturedRecipeBtn = document.getElementById('close-featured-recipe');
const toTopBtn = document.getElementById('to-top');
const toBottomBtn = document.getElementById('to-bottom');
// console.log(ingredientsData);
// findRecipeIngredients("Dirty Steve's Original Wing Sauce")
// displayRecipes();
// --- // Event Listeners // --- //
recipesContainer.addEventListener('click', event => {
  const recipeCard = event.target.closest('figure');
  if (recipeCard) {
    // must create a recipe card and populate featured recipe section with clicked card
    featuredRecipe.classList.add('unhide');
  }
});

closeFeaturedRecipeBtn.addEventListener('click', () => {
  featuredRecipe.classList.remove('unhide');
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

toBottomBtn.addEventListener('click', () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
});
