import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { DietType } from '../../api/dietType/dietType.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  DietType.insert(data);
}

/** Initialize the collection if empty. */
if (DietType.find().count() === 0) {
  if (Meteor.settings.defaultDietType) {
    console.log('Creating default DietType.');
    Meteor.settings.defaultDietType.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('DietType', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return DietType.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('DietTypeAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return DietType.find();
  }
  return this.ready();
});
