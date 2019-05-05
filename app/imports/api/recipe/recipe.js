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
  servingSize: String,
  directions: String,
  /*
  isVegan: Boolean,
  isVegetarian: Boolean,
  isNutAllergySafe: Boolean,
  isSeafoodAllergySafe: Boolean,
  isDairyAllergySafe: Boolean, */
  owner: [String],
}, { tracker: Tracker });

const RecipeSchema1 = new SimpleSchema({
  name: String,
  tool: String,
  time: String,
  servingSize: String,
  directions: String,
  owner: [String],
}, { tracker: Tracker });

const OwnerSchema = new SimpleSchema({
  owner: [String],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);
Recipes.attachSchema(RecipeSchema1);
Recipes.attachSchema(OwnerSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema, RecipeSchema1, OwnerSchema };
