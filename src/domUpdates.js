import { getIngredientsInfo } from './ingredients';
import {
  estimateCostPerRecipeIngredients,
  estimateCostPerRecipe,
} from './recipes';
import { createSlider } from './slider';
// --- // DOM Nodes // --- //
var recipesContainer = document.querySelector('.recipes-container');
var featuredRecipe = document.getElementById('featured-recipe');
var tagFilterSelector = document.getElementById('filter-by-tag');
const heartIconOutlined = document.getElementById('heart-icon-outlined');
const heartIconFilled = document.getElementById('heart-icon-filled');
// -- featured recipe -- //
const featHeader = featuredRecipe.querySelector('h2');
const featImg = featuredRecipe.querySelector('img');
const featIngredientsList = featuredRecipe.querySelector(
  '#featured-ingredients-list'
);
const featCostOfIngredients = featuredRecipe.querySelector(
  '#cost-of-ingredients'
);
const featTags = featuredRecipe.querySelector('#featured-tag-list');
const featInstructions = featuredRecipe.querySelector('#featured-instructions');
// --- // Event Listeners // --- //

// --- // Functions // --- //
export const updateDomWithAPIData = (recipes, recipeTags, imageIds) => {
  displayRecipes(recipes, recipesContainer);
  displayRecipeTags(recipeTags);
  createSlider(recipes);
};

export const createRecipeCard = recipe => {
  const recipeCard = document.createElement('figure');
  recipeCard.setAttribute('class', 'recipe-card');

  const recipeTitle = document.createElement('figcaption');
  recipeTitle.innerText = recipe.name;
  recipeCard.appendChild(recipeTitle);

  const imageContainter = document.createElement('div');
  recipeCard.appendChild(imageContainter);
  const recipeImage = createImage(recipe.image, `${recipe.name} dish`);
  imageContainter.appendChild(recipeImage);

  recipeCard.id = recipe.id;
  return recipeCard;
};

export const displayRecipes = (recipeList, recipesContainer) => {
  recipesContainer.innerHTML = '';
  recipeList.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
};

export const createImage = (imageSource, imageAlt) => {
  const recipeImg = document.createElement('img');
  recipeImg.src = imageSource;
  recipeImg.alt = imageAlt;
  return recipeImg;
};

export const updateFeaturedRecipe = (recipe, user, allIngredients) => {
  featHeader.innerText = recipe.name;

  featImg.src = recipe.image;
  featImg.alt = `${recipe.name} dish`;

  const ingredients = getIngredientsInfo(allIngredients, recipe.ingredients);

  featIngredientsList.innerHTML = '';
  ingredients.forEach(ingredient =>
    featIngredientsList.appendChild(createIngredientNode(ingredient))
  );

  const ingredientCosts = estimateCostPerRecipeIngredients(
    allIngredients,
    recipe
  );
  const recipeTotalCost = estimateCostPerRecipe(ingredientCosts);

  featCostOfIngredients.innerText = recipeTotalCost;

  featInstructions.innerHTML = '';

  recipe.instructions.forEach(instruction =>
    featInstructions.appendChild(createInstructionNode(instruction))
  );

  featTags.innerHTML = '';
  recipe.tags.forEach(tag => featTags.appendChild(createTagNode(tag)));

  updateHeartIconsByUser(recipe.id, user);
  const scrollableDiv = featuredRecipe.querySelector('div');
  console.log('top of scrollable div', scrollableDiv.scrollTop);
  console.log('top of instructions', featInstructions.scrollTop);
};

const updateHeartIconsByUser = (recipeId, user) => {
  [heartIconOutlined, heartIconFilled].forEach(icon =>
    icon.classList.remove('hidden')
  );

  if (user.recipesToCook.includes(recipeId)) {
    heartIconOutlined.classList.add('hidden');
  } else {
    heartIconFilled.classList.add('hidden');
  }
};

const createIngredientNode = ingredient => {
  const { id, name, quantity } = ingredient;
  let { amount, unit } = quantity;
  const element = document.createElement('li');
  element.id = id;
  amount = Math.round(amount * 100) / 100;
  element.innerText = `${amount} ${unit} ${name}`;
  return element;
};

const createInstructionNode = instructionInfo => {
  const { instruction, number } = instructionInfo;
  const element = document.createElement('div');
  const heading = document.createElement('h4');
  heading.innerText = `STEP ${number}`;
  const paragraph = document.createElement('p');
  paragraph.innerText = instruction;
  element.appendChild(heading);
  element.append(paragraph);
  return element;
};

const createTagNode = tag => {
  const element = document.createElement('span');
  element.innerText = tag;
  return element;
};

export const displayRecipeTags = tags => {
  tagFilterSelector.appendChild(createTagSelector(''));
  tags.forEach(tag => {
    tagFilterSelector.appendChild(createTagSelector(tag));
  });
};

const createTagSelector = tag => {
  const option = document.createElement('option');
  option.setAttribute('value', tag);
  option.innerText = tag;
  return option;
};
