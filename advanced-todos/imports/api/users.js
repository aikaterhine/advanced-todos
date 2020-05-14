import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Users = new Mongo.Collection('users2');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish users that are public or belong to the current user
  Meteor.publish('users2', function usersPublication(iduser) {
    if(iduser===""){
      return Users.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId },
        ],
      });
    }
    else{
      return Users.find({ _id: iduser});
    }
  });
}

Meteor.methods({
  'users.insert'(name, email, birthday, gender, company, photo) {
    check(name, String);
    check(email, String);
    check(birthday, String);
    check(gender, String);
    check(company, String);

    Users.insert({
      name: name,
      email: email,
      birthday: birthday,
      gender: gender,
      company: company,
      photo: this.userId,
    });
  },
  'users.update'(userId, name, email, stateT, date) {

    check(userId, String);
    check(name, String);
    check(email, String);
    check(stateT, String);
    check(date, String);

    const user = Users.findOne(userId);

    if (user.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Users.update(userId, { $set: { name: name, email: email, state: stateT, createdAt: date} });

  },

});
