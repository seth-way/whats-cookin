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
  filterRecipesByCost,
  getMaxRecipeCost,
} from './recipes';
import {
  getRandomUser,
  filterUserRecipes,
  addRecipeToUserList,
  removeRecipeFromUserList,
} from './users';
import { createCostFilterSliders } from './costFilterSliders';
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
// var minCost = 0;
var maxCost = 9999;
var rangeMin = 0;
var rangeMax = maxCost;
var costFilterSliders;
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
// -- cost filter slider -- //
const minCostTextInput = document.getElementById('min-cost-filter');
const maxCostTextInput = document.getElementById('max-cost-filter');
const rangeInputTrack = document.getElementById('cost-range-track');
const rangeInputSliders = document.querySelectorAll(
  '.cost-range-slider-box .double-range-slider input'
);
// -- other -- //
const myRecipesCheckBox = document.getElementById('my-recipes-checkbox');
const tagFilterInput = document.getElementById('filter-by-tag');
const nameFilterInput = document.getElementById('filter-by-name');
const searchBox = document.querySelector('.search-box');
const filterOptions = document.getElementById('filter-options');
const filterCostForm = document.querySelector('.cost-range-slider-box');
const filterTagForm = document.querySelector('.filter-tag-box');
// const minCostFilterInput = document.getElementById('filter-by-min-cost');
// const maxCostFilterInput = document.getElementById('filter-by-max-cost');
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

filterOptions.addEventListener('change', () => {
  filteredRecipes = allRecipes;
  displayRecipes(filteredRecipes, recipesContainer);
  filterTagForm.classList.toggle('hidden');
  filterCostForm.classList.toggle('hidden');
});

rangeInputSliders.forEach(input => {
  input.addEventListener('input', event => {
    let newMin = rangeMin;
    let newMax = rangeMax;

    newMin = costFilterSliders.setMinCostOutput();
    newMax = costFilterSliders.setMaxCostOutput();

    costFilterSliders.minRangeFill();
    costFilterSliders.maxRangeFill();

    if (newMax - newMin < 1) {
      if (event.target.className === 'min') {
        rangeInputSliders[0].value = newMax - 1;
        newMin = costFilterSliders.setMinCostOutput();
        costFilterSliders.minRangeFill();
        event.target.style.zIndex = '2';
      } else {
        rangeInputSliders[1].value = newMin + 1;
        event.target.style.zIndex = '2';
        newMax = costFilterSliders.setMaxCostOutput();
        costFilterSliders.maxRangeFill();
      }
    }

    if (newMin !== rangeMin || newMax !== rangeMax) {
      filteredRecipes = filterRecipesByCost(allRecipes, newMin, newMax);
      displayRecipes(filteredRecipes, recipesContainer);
    }

    rangeMin = newMin;
    rangeMax = newMax;
  });
});

minCostTextInput.addEventListener('change', event => {
  const newValue = Number(event.target.value) || 0;
  if (newValue < rangeMax) {
    rangeMin = newValue;
    costFilterSliders.setMinFromText(rangeMin);
    filteredRecipes = filterRecipesByCost(allRecipes, rangeMin, rangeMax);
    displayRecipes(filteredRecipes, recipesContainer);
  }
});

maxCostTextInput.addEventListener('change', event => {
  const newValue = Number(event.target.value) || maxCost;
  if (newValue > rangeMin) {
    rangeMax = newValue;
    costFilterSliders.setMaxFromText(rangeMax);
    filterRecipesByCost(allRecipes, rangeMin, rangeMax);
    displayRecipes(filteredRecipes, recipesContainer);
  }
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
  // initiate cost input sliders
  maxCost = getMaxRecipeCost(allRecipes);
  costFilterSliders = createCostFilterSliders(maxCost);

  recipeTags = getAllRecipeTags(allRecipes);
  currentUser = getRandomUser(allUsers);
}
