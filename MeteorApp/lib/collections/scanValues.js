import {Mongo} from 'meteor/mongo';

const ScanValues = new Mongo.Collection('scanValues');

Meteor.methods({
  'insertValue': (data) =>  {
    let val = data.values,
        userId = data.userId;

    ScanValues.update({userId:userId}, {$push: {values:val} }, {upsert:true});
  }
});

Meteor.methods({
  'findAllValues': (userId) =>  {
    let user = ScanValues.find({userId:userId}).fetch();
    return user;
  }
});

Meteor.methods({
  'console': (data) =>  {
    console.log('console', data);
  }
});

Meteor.methods({
  'remove': (id) =>  {
    ScanValues.remove({userId:id});
  }
});
	
export default ScanValues;


