import recipeData from "./data/recipes";







//NOTE: Your DOM manipulation will occur in this file
var recipeContainer = document.querySelector(".recipe-list");
//Here is an example function just to demonstrate one way 
// you can export/import between the two js files. 
// You'll want to delete this once you get your own code going.

window.addEventListener("load",() =>displayRecipes(recipeData,recipeContainer));
// make an call back function to envoke multiple function's on page load

const displayRecipes = (recipeList,recipeContainer) => {
  recipeContainer.innerHTML = ""
  recipeList.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe)
    recipeContainer.appendChild(recipeCard)



  })
  console.log(`Displaying recipes now`)
}



function createRecipeCard(recipe, recipeContainer) {
  const recipeCard = document.createElement("figure");
  recipeCard.setAttribute("class", "recipe-card");
  // recipeContainer.appendChild(recipeCard);
  const recipeTitle = document.createElement("figcaption");
  recipeTitle.innerText = recipe.name;
  recipeCard.appendChild(recipeTitle);
  const recipeImage = createImage(recipe.image, `Image of ${recipe.name} dish`);
  recipeCard.appendChild(recipeImage);
  return recipeCard
}



function createImage(imageSource, imageAlt) {
  const recipeImg = document.createElement("img");
  recipeImg.src = imageSource;
  recipeImg.alt = imageAlt;
  return recipeImg;
}




export {
  displayRecipes,createRecipeCard
}