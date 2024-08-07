# 🍳🔥 [What's Cooking](https://seth-way.github.io/whats-cookin/) 🔥🍳

### Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)

This app is a recipe tracking / meal planning application that allows users to view recipes they want to cook & plan shopping trips around them. Users can view a list of recipes, filter them by name or tag, & choose recipes to cook.

### Installation Instructions:

> [!WARNING]
> **[Node.js](https://nodejs.org/en) & [npm](https://www.npmjs.com/) are required to run this app.**<br>
> _Please ensure you have both installed on your machine before proceeding._

- _(optional) Fork this project to your own Github account._
- Clone the repository to your local machine.
- `cd` into the project folder.
- Use the `npm install` command to install the project dependencies.
- Use the `npm start` command to run webpack.
- Check the console for the `PORT` and copy/paste `localhost:PORT` into your web browser.

### Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)

![site natigation preview](dist/images/page-navigation.gif)

![filtering recipes demo](dist/images/filtering.gif)

### Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)

This was project was built over a 2 week period by a team of Mod 2 Turing students. We are in our 8th week of JS instruction. This app took roughly 20 hours to complete.

### Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)

This app was built by [Carissa Hluchan](https://github.com/CarissaHluchan), [Willem Pol](https://github.com/wavpool), [Marshall Hotaling](https://github.com/marshallhotaling), & [Seth Way](https://github.com/seth-way).

### Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)

- Use object & array prototype methods to perform data manipulation
- Create a user interface that is easy to use & clearly displays information.
- Write DRY, reusable code that follows SRP & trends toward function purity
- Implement a robust testing suite using TDD
- Make network requests to retrieve data
- Collaborate productively & professionally as a team. Ensure all team members are able to be heard & contribute throughout the project.

### Wins + Challenges:
[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)

- Our app crashed when conflicting merges did not present themselves as 'merge conflicts.' By visitting our commit history and utilizing a staging branch, we were able to introduce and remove all the appropriate code to successfully complete the merge.

- The recipe cost slider is a complex UI component made of 2 separate slider inputs. In order to make working with it easier, we used closures so that the cost-slider object had access to all the necessary variables.
