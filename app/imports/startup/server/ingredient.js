import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Ingredients } from '../../api/ingredient/ingredient.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Ingredients.insert(data);
}

/** Initialize the collection if empty. */
if (Ingredients.find().count() === 0) {
  if (Meteor.settings.defaultIngredients) {
    console.log('Creating default Ingredients.');
    Meteor.settings.defaultIngredients.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Ingredients', function publish() {
  if (this.userId) {
    return Ingredients.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('IngredientsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Ingredients.find();
  }
  return this.ready();
});
