import { Meteor } from 'meteor/meteor';
import { ScanValues } from '/lib/collections';

export default () => {
   Meteor.publish('getValues', function(id) {
    return ScanValues.find({userId:this.userId});
  });
}



