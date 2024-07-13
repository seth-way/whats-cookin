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
  createImage,
} from './domUpdates';
import {
  findRecipe,
  getAllRecipeTags,
  filterRecipesByTag,
  filterRecipesByName,
  getRandomRecipe,
} from './recipes';
import {
  getRandomUser,
  filterUserRecipes,
  addRecipeToUserList,
  removeRecipeFromUserList,
} from './users';
// --- // Variables // --- //
var featuredRecipe = {};
var recipes = [];
var filteredRecipes = [];
var recipeTags = [];
var currentUser = {};
var landingImageRecipeIds = [];
// --- // DOM Nodes // --- //
// -- containers -- //
const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipeContainer = document.getElementById('featured-recipe');
const landingImages = document.querySelectorAll('.landing-image');
const carouselContainer = document.querySelector('.carousel');
// -- buttons -- //
const closeFeaturedRecipeBtn = document.getElementById('close-featured-recipe');
const toggleMyRecipesBtn = document.querySelector('.heart');
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
    updateFeaturedRecipe(featuredRecipe, currentUser);
    featuredRecipeContainer.classList.add('unhide');
  }
});

carouselContainer.addEventListener('click', event => {
  const recipeImg = event.target.closest('img');
  if (recipeImg) {
    const recipeId = Number(recipeImg.id);
    const recipe = findRecipe(recipes, recipeId);
    featuredRecipe = { ...recipe };
    updateFeaturedRecipe(featuredRecipe, currentUser);
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
  fillLandingImages();
}

function fillLandingImages() {
  console.log(landingImages);
  landingImages.forEach(image => {
    var randomRecipe = getRandomRecipe(recipes);
    while (landingImageRecipeIds.includes(randomRecipe.id)) {
      randomRecipe = getRandomRecipe(recipes);
    }

    landingImageRecipeIds.push(randomRecipe.id);
    const recipeImage = createImage(
      randomRecipe.image,
      `Image of ${randomRecipe.name} dish`
    );

    recipeImage.id = randomRecipe.id;
    image.appendChild(recipeImage);
  });
}
