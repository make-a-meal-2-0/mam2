import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const DietType = new Mongo.Collection('DietType');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DietTypeSchema = new SimpleSchema({
  name: String,
  isAtkins: Boolean,
  isZone: Boolean,
  isKeto: Boolean,
  isVegan: Boolean,
  isNonDairy: Boolean,
  isNutFree: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
DietType.attachSchema(DietTypeSchema);

/** Make the collection and schema available to other code. */
export { DietType, DietTypeSchema };
