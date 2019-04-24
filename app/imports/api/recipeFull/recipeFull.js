import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const dietType = new Mongo.Collection('dietType');

/** Create a schema to constrain the structure of documents associated with this collection. */
const dietTypeSchema = new SimpleSchema({
  isAtkins: Boolean,
  isZone: Boolean,
  isKeto: Boolean,
  isVegan: Boolean,
  isNonDairy: Boolean,
  isNutFree: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
dietType.attachSchema(dietTypeSchema);

/** Make the collection and schema available to other code. */
export { dietType, dietTypeSchema };
