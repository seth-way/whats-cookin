import { getIngredientsInfo } from './ingredients';
import {
  estimateCostPerRecipeIngredients,
  estimateCostPerRecipe,
  getRandomRecipe,
} from './recipes';
// --- // Variables // --- //

// --- // DOM Nodes // --- //
var recipesContainer = document.querySelector('.recipes-container');
var featuredRecipe = document.getElementById('featured-recipe');
var tagFilterSelector = document.getElementById('filter-by-tag');
const heartIconOutlined = document.getElementById('heart-icon-outlined');
const heartIconFilled = document.getElementById('heart-icon-filled');
const landingImages = document.querySelectorAll('.landing-image');
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
  fillLandingImages(recipes, imageIds);
};

function fillLandingImages(recipes, landImageIds) {
  landingImages.forEach(image => {
    var randomRecipe = getRandomRecipe(recipes);
    while (landImageIds.includes(randomRecipe.id)) {
      randomRecipe = getRandomRecipe(recipes);
    }

    landImageIds.push(randomRecipe.id);
    const recipeImage = createImage(
      randomRecipe.image,
      `Image of ${randomRecipe.name} dish`
    );

    recipeImage.id = randomRecipe.id;
    image.appendChild(recipeImage);
  });
}

export const createRecipeCard = recipe => {
  const recipeCard = document.createElement('figure');
  recipeCard.setAttribute('class', 'recipe-card');
  // recipeContainer.appendChild(recipeCard);
  const recipeTitle = document.createElement('figcaption');
  recipeTitle.innerText = recipe.name;
  recipeCard.appendChild(recipeTitle);
  const imageContainter = document.createElement('div');
  recipeCard.appendChild(imageContainter);
  const recipeImage = createImage(recipe.image, `Image of ${recipe.name} dish`);
  imageContainter.appendChild(recipeImage);
  // const recipeCardID = recipe.id
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
  featImg.alt = `Image of ${recipe.name} dish`;

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
