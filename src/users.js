export const getRandomUser = users =>
  users[Math.floor(Math.random() * users.length)];

export const addRecipeToUserList = (user, recipeID) => {
  if (typeof recipeID !== 'number') return user;
  user.recipesToCook.push(recipeID);
  return user;
};

export const removeRecipeFromUserList = (user, recipeID) => {
  const recipeIdx = user.recipesToCook.indexOf(recipeID);
  if (recipeIdx !== -1) user.recipesToCook.splice(recipeIdx, 1);
  return user;
};

export const filterUserRecipes = (recipes, userList) => {
  return recipes.filter(recipe => userList.includes(recipe.id));
}
