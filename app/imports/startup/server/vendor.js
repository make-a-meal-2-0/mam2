import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendor/vendor';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.insert(data);
}

/** Initialize the collection if empty. */
if (Vendors.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.map(data => addData(data));
  }
}

Meteor.publish('Vendors', function publish() {
    return Vendors.find();
});
