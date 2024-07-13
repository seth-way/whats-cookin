import './styles.css';
import apiCalls from './apiCalls';
// --- // Images // --- //
import './images/turing-logo.png';
import './images/hamburger.svg';
// --- // Data // --- //
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';
import usersData from './data/users';
// --- // Methods // --- //
import {
  displayRecipes,
  updateFeaturedRecipe,
  displayRecipeTags,
} from './domUpdates';
import {
  findRecipe,
  getAllRecipeTags,
  filterRecipesByTag,
  filterRecipesByName,
} from './recipes';
import { getRandomUser, filterUserRecipes } from './users';
// --- // Variables // --- //
var featuredRecipe = {};
var recipes = [];
var filteredRecipes = [];
var recipeTags = [];
var currentUser = {};
// --- // DOM Nodes // --- //
// -- containers -- //
const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipeContainer = document.getElementById('featured-recipe');
// -- buttons -- //
const closeFeaturedRecipeBtn = document.getElementById('close-featured-recipe');
const toTopBtn = document.getElementById('to-top');
const toBottomBtn = document.getElementById('to-bottom');
// -- other -- //
const myRecipesCheckBox = document.getElementById('my-recipes-checkbox');
const tagFilterInput = document.getElementById('filter-by-tag');
const nameFilterInput = document.getElementById('filter-by-name');
// --- // Event Listeners // --- //
window.addEventListener('load', start);

recipesContainer.addEventListener('click', event => {
  const recipeCard = event.target.closest('figure');
  if (recipeCard) {
    const recipeId = Number(recipeCard.id);
    const recipe = findRecipe(recipes, recipeId);
    featuredRecipe = { ...recipe };
    updateFeaturedRecipe(featuredRecipe);
    featuredRecipeContainer.classList.add('unhide');
  }
});

closeFeaturedRecipeBtn.addEventListener('click', () => {
  featuredRecipeContainer.classList.remove('unhide');
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

tagFilterInput.addEventListener('change', event => {
  const tag = event.target.value;
  filteredRecipes = filterRecipesByTag(recipes, tag);
  displayRecipes(filteredRecipes, recipesContainer);
});

nameFilterInput.addEventListener('change', event => {
  const input = event.target.value;
  filteredRecipes = filterRecipesByName(recipes, input);
  displayRecipes(filteredRecipes, recipesContainer);
});

myRecipesCheckBox.addEventListener('change', event => {
  if (event.target.checked) {
    filteredRecipes = filterUserRecipes(recipes, currentUser.recipesToCook);
  } else {
    filteredRecipes = [...recipes];
  }
  displayRecipes(filteredRecipes, recipesContainer);
});

function start() {
  recipes = recipeData; // later this will be a data fetch
  displayRecipes(recipes, recipesContainer);
  recipeTags = getAllRecipeTags(recipeData);
  displayRecipeTags(recipeTags);
  currentUser = getRandomUser(usersData);
  currentUser.recipesToCook.push(412309, 741603, 562334, 507921);
  console.log(currentUser);
}
