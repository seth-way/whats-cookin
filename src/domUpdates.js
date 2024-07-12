import recipeData from './data/recipes';
var recipesContainer = document.querySelector('.recipes-container');

window.addEventListener('load', () =>
  displayRecipes(recipeData, recipesContainer)
);

export const displayRecipes = (recipeList, recipesContainer) => {
  recipesContainer.innerHTML = '';
  recipeList.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
  console.log(`Displaying recipes now`);
};

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

const createImage = (imageSource, imageAlt) => {
  const recipeImg = document.createElement('img');
  recipeImg.src = imageSource;
  recipeImg.alt = imageAlt;
  return recipeImg;
};
