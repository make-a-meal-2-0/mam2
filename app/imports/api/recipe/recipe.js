import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Recipes = new Mongo.Collection('Recipes');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RecipeSchema = new SimpleSchema({
  name: String,
  tool: String,
  time: String,
  directions: String,
<<<<<<< HEAD
  servingSize: String,
  owner: String,
=======
  owner: [String],
}, { tracker: Tracker });

const OwnerSchema = new SimpleSchema({
  owner: [String],
>>>>>>> 5c2e05ad0c2b4fc8c4afd7ba51301201ef58d53f
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);
Recipes.attachSchema(OwnerSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema, OwnerSchema };
