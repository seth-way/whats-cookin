import './styles.css';
import apiCalls from './apiCalls';
// --- // Images // --- //
import './images/turing-logo.png';
import './images/hamburger.svg';
// --- // Methods // --- //
import {
  displayRecipes,
  updateFeaturedRecipe,
  updateDomWithAPIData,
} from './domUpdates';
import {
  findRecipe,
  getAllRecipeTags,
  updateAllRecipesWithCost,
  filterRecipesByTag,
  filterRecipesByName,
} from './recipes';
import {
  getRandomUser,
  filterUserRecipes,
  addRecipeToUserList,
  removeRecipeFromUserList,
} from './users';
import { fetchData } from './apiCalls';
// --- // Variables // --- //
var allRecipes = [];
var allUsers = [];
var allIngredients = [];
var featuredRecipe = {};
var filteredRecipes = [];
var recipeTags = [];
var currentUser = {};
var landingImageRecipeIds = [];
// --- // DOM Nodes // --- //
// -- containers -- //
const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipeContainer = document.getElementById('featured-recipe');
const landingImages = document.querySelectorAll('.landing-image');
const recipeCarousel = document.getElementById('recipe-carousel');
// -- buttons -- //
const closeFeaturedRecipeBtn = document.getElementById('close-featured-recipe');
const toggleMyRecipesBtn = document.querySelector('.heart');
const toTopBtn = document.getElementById('to-top');
const toBottomBtn = document.getElementById('to-bottom');
// -- other -- //
const myRecipesCheckBox = document.getElementById('my-recipes-checkbox');
const tagFilterInput = document.getElementById('filter-by-tag');
const nameFilterInput = document.getElementById('filter-by-name');
const searchBox = document.querySelector('.search-box')
// --- // Event Listeners // --- //
window.addEventListener('load', start);

recipesContainer.addEventListener('click', event => {
  const recipeCard = event.target.closest('figure');
  if (recipeCard) {
    const recipeId = Number(recipeCard.id);
    const recipe = findRecipe(allRecipes, recipeId);
    featuredRecipe = { ...recipe };
    updateFeaturedRecipe(featuredRecipe, currentUser, allIngredients);
    featuredRecipeContainer.classList.add('unhide');
  }
});

recipeCarousel.addEventListener('click', event => {
  const slide = event.target.closest('.swiper-slide');
  if (slide) {
    const recipeId = Number(slide.id.split('-')[0]);
    const recipe = findRecipe(allRecipes, recipeId);
    featuredRecipe = { ...recipe };
    updateFeaturedRecipe(featuredRecipe, currentUser, allIngredients);
    featuredRecipeContainer.classList.add('unhide');
  }
});

closeFeaturedRecipeBtn.addEventListener('click', () => {
  featuredRecipeContainer.classList.remove('unhide');
});

toggleMyRecipesBtn.addEventListener('click', () => {
  const icons = toggleMyRecipesBtn.querySelectorAll('svg');
  icons.forEach(icon => {
    icon.classList.toggle('hidden');
  });

  const { id } = featuredRecipe;
  if (currentUser.recipesToCook.includes(id)) {
    currentUser = removeRecipeFromUserList(currentUser, id);
  } else {
    currentUser = addRecipeToUserList(currentUser, id);
  }
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
  filteredRecipes = filterRecipesByTag(allRecipes, tag);
  displayRecipes(filteredRecipes, recipesContainer);
});

nameFilterInput.addEventListener('change', event => {
  const input = event.target.value;
  filteredRecipes = filterRecipesByName(allRecipes, input);
  displayRecipes(filteredRecipes, recipesContainer);
});

searchBox.addEventListener('submit', event => {
  event.preventDefault();
});

myRecipesCheckBox.addEventListener('change', event => {
  if (event.target.checked) {
    filteredRecipes = filterUserRecipes(allRecipes, currentUser.recipesToCook);
  } else {
    filteredRecipes = [...allRecipes];
  }
  displayRecipes(filteredRecipes, recipesContainer);
});

function start() {
  Promise.all([
    fetchData('recipes'),
    fetchData('ingredients'),
    fetchData('users'),
  ])
    .then(data => {
      updateGlobalVariables(...data);
      updateDomWithAPIData(allRecipes, recipeTags, landingImageRecipeIds);
    })
    .catch(err => console.log(err));
}

function updateGlobalVariables(recipeData, ingredientData, usersData) {
  const { recipes } = recipeData;
  const { ingredients } = ingredientData;
  const { users } = usersData;

  allRecipes = updateAllRecipesWithCost(ingredients, recipes);
  allIngredients = ingredients;
  allUsers = users;
allRecipes.forEach(recipe => console.log(recipe.totalCost))

  recipeTags = getAllRecipeTags(allRecipes);
  currentUser = getRandomUser(allUsers);
}
