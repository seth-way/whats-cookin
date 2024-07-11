import recipeData from './data/recipes';
var recipeContainer = document.querySelector('.recipe-list');

window.addEventListener('load', () =>
  displayRecipes(recipeData, recipeContainer)
);

export const displayRecipes = (recipeList, recipeContainer) => {
  recipeContainer.innerHTML = '';
  recipeList.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeCard);
  });
  console.log(`Displaying recipes now`);
};

export const createRecipeCard = (recipe, recipeContainer) => {
  const recipeCard = document.createElement('figure');
  recipeCard.setAttribute('class', 'recipe-card');
  // recipeContainer.appendChild(recipeCard);
  const recipeTitle = document.createElement('figcaption');
  recipeTitle.innerText = recipe.name;
  recipeCard.appendChild(recipeTitle);
  const recipeImage = createImage(recipe.image, `Image of ${recipe.name} dish`);
  recipeCard.appendChild(recipeImage);
  return recipeCard;
};

const createImage = (imageSource, imageAlt) => {
  const recipeImg = document.createElement('img');
  recipeImg.src = imageSource;
  recipeImg.alt = imageAlt;
  return recipeImg;
};
