import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const RecipeFull = new Mongo.Collection('RecipeFull');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RecipeFullSchema = new SimpleSchema({
  recipe: Recipes,
  ingredients: Ingredients,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
RecipeFull.attachSchema(RecipeFullSchema);

/** Make the collection and schema available to other code. */
export { RecipeFull, RecipeFullSchema };
