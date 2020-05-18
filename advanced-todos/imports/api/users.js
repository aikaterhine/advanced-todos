import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Users that are public or belong to the current user
  Meteor.publish('Users', function UsersPublication(iduser) {
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
  'Users.insert'(name, email, password, birthday, gender, company, photo) {
    check(name, String);
    check(email, String);
    check(password, String);
    check(birthday, String);
    check(gender, String);
    check(company, String);
    check(photo, String);

    const userExists = Users.findUserByEmail(email);

    if(userExists){
      throw new Meteor.Error('user-exists');
    }

    const userId = Accounts.createUser({ email: email,
      password: password,
      profile:{
      nome: name,
      datadenascimento: birthday,
      genero: gender,
      empresa: company,
      photo: photo,
    }});
  },
  'Users.update'(userId, name, email, birthday, gender, company, photo) {

    check(name, String);
    check(email, String);
    check(birthday, String);
    check(gender, String);
    check(company, String);
    check(photo, String);

    const user = Users.findOne(userId);
    const userExists = Users.findUserByEmail(email);

    if (Boolean(Meteor.userId()) === false) {
      throw new Meteor.Error('not-logged');
    }
    if(userExists){
      throw new Meteor.Error('user-exists');
    }

    Users.update(userId, { $set:
      { email: email,
      password: password,
      profile: {
      nome: name,
      datadenascimento: birthday,
      genero: gender,
      empresa: company,
      photo: photo,
    }}
  });
  },

});
