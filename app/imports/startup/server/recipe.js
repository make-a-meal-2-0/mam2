import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Recipes } from '../../api/recipe/recipe.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Recipes.insert(data);
}

/** Initialize the collection if empty. */
if (Recipes.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default Recipes.');
    Meteor.settings.defaultRecipes.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Recipes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('ListRecipes', function publish() {
    return Recipes.find();
    // return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('RecipesAdmin', function publish() {
    return Recipes.find();
});
