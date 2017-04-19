import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskUpdate: function(number) {
    var database = Tasks.findOne({});
    Tasks.update(database._id, {
      $set: {
        toplamilerleme: number
      }
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('tasks', function() {
    return Tasks.find({});
  });
}
