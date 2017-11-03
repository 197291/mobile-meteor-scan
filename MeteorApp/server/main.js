import { Meteor } from 'meteor/meteor';
import publications from './publications';
import seeds from './seeds';
import { ScanValues } from '../lib/collections';


Meteor.startup(() => {
  publications();
  seeds();
});


