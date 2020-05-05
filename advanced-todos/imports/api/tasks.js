import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(name, description) {
    check(name, String);
    check(description, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      name: name,
      description: description,
      state: "Cadastrada",
      private: false,
      modeedition: false,
      createdAt: new Date(), // current time
      owner: this.userId,           // _id of logged in user
      username: Meteor.users.findOne(this.userId).username,  // username of logged in user
    });
  },
  'tasks.remove'(taskId) {

    check(taskId, String);

    const task = Tasks.findOne(taskId);
      if (task.private && task.owner !== this.userId) {
       // If the task is private, make sure only the owner can delete it
       throw new Meteor.Error('not-authorized');
     }

      Tasks.remove(taskId);
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
  check(taskId, String);
  check(setToPrivate, Boolean);

  const task = Tasks.findOne(taskId);

  // Make sure only the task owner can make a task private
  if (task.owner !== this.userId) {
    throw new Meteor.Error('not-authorized');
  }

  Tasks.update(taskId, { $set: { private: setToPrivate } });
},
  'tasks.setModeEdition'(taskId, setToModeEdition) {
  check(taskId, String);
  check(setToModeEdition, Boolean);

  const task = Tasks.findOne(taskId);

  // Make sure only the task owner can make a task private
  if (task.owner !== this.userId) {
    throw new Meteor.Error('not-authorized');
  }

  Tasks.update(taskId, { $set: { modeedition: setToModeEdition } });
  },
  'tasks.updateState'(taskId, stateT) {
    check(taskId, String);
    check(stateT, String);

    const task = Tasks.findOne(taskId);

    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { state: stateT } });

  },
  'tasks.update'(taskId, name, description, stateT, date) {

    check(taskId, String);
    check(name, String);
    check(description, String);
    check(stateT, String);
    check(date, String);

    const task = Tasks.findOne(taskId);

    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { name: name, description: description, state: stateT, createdAt: date} });

  },
});
