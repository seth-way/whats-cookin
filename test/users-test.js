import { expect } from 'chai';
import usersData from '../src/data/users';
import recipeData from '../src/data/recipes';
import { filterSampleData } from '../src/data/recipes-sample';
import {
  getRandomUser,
  addRecipeToUserList,
  removeRecipeFromUserList,
  filterUserRecipes,
} from '../src/users';

describe('get random user from list of users', () => {
  it('should return a member of the input array', () => {
    const randomUser = getRandomUser(usersData);
    const isInUsersArray = usersData.includes(randomUser);
    expect(isInUsersArray).to.be.true;
  });

  it('should not always return the same user', () => {
    const randomUser = getRandomUser(usersData);
    const randomIDs = [];
    for (let i = 0; i < 10; i += 1) {
      const { id } = getRandomUser(usersData);
      randomIDs.push(id);
    }
    const allSameUser = randomIDs.every(id => id === randomUser.id);
    expect(allSameUser).to.be.false;
  });
});

describe('add OR remove recipes from user`s recipesToCook list', () => {
  var user = usersData[0];
  beforeEach(() => {
    user.recipesToCook.push(412309, 741603, 562334);
  });

  afterEach(() => {
    user.recipesToCook = [];
  });

  it('should add a new recipe to a users list', () => {
    const updatedUser = addRecipeToUserList(user, 507921);
    const expectedList = [412309, 741603, 562334, 507921];
    expect(updatedUser.recipesToCook).to.deep.equal(expectedList);
  });

  it('should not add any non-number to the list', () => {
    const updatedUser = addRecipeToUserList(user, '507921');
    const expectedList = [412309, 741603, 562334];
    expect(updatedUser.recipesToCook).to.deep.equal(expectedList);
  });

  it('should remove a recipe from a users list', () => {
    const updatedUser = removeRecipeFromUserList(user, 741603);
    const expectedList = [412309, 562334];
    expect(updatedUser.recipesToCook).to.deep.equal(expectedList);
  });

  it('should not remove a recipe if id not found', () => {
    const updatedUser = removeRecipeFromUserList(user, 'invalid');
    const expectedList = [412309, 741603, 562334];
    expect(updatedUser.recipesToCook).to.deep.equal(expectedList);
  });
});

describe('filter recipes to only those in the users list', () => {
  var userList = [412309, 741603, 562334];
  it('should filter by a users list', () => {
    const usersRecipes = filterUserRecipes(recipeData, userList);
    expect(filterSampleData).to.deep.equal(usersRecipes);
  });
});
