import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Users that are public or belong to the current user
  Meteor.publish('Users', function UsersPublication(iduser) {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
  });
}

Meteor.methods({
  'Users.insert'(name, email, password, birthday, gender, company, photo) {
    check(name, String);
    check(email, String);
    check(password, String);
    check(gender, String);
    check(company, String);
    check(photo[0].base64, String);

    if(Meteor.isServer && Accounts.findUserByEmail(email)){
      throw new Meteor.Error('user-exists');
    }

    const userId = Accounts.createUser({ email: email,
      password: password,
      profile:{
      nome: name,
      datadenascimento: birthday,
      genero: gender,
      empresa: company,
      photo: photo[0].base64,
    }});
  },
  'Users.update'(userId, name, emailOriginal, email, password, birthday, gender, company, photo) {

    check(name, String);
    check(emailOriginal, String);
    check(email, String);
    check(birthday, String);
    check(gender, String);
    check(company, String);
    check(photo[0].base64, String);

    const user = Users.findOne(userId);

    if (Boolean(Meteor.userId()) === false) {
      throw new Meteor.Error('not-logged');
    }
    if((emailOriginal !== email) && Meteor.isServer && Meteor.findUserByEmail(email)){
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
      photo: photo[0].base64,
    }}
  });
  },
  'Users.login'(email, password) {
    check(email, String);
    check(password, String);

    if(!(Meteor.isServer && Accounts.findUserByEmail(email))){
      throw new Meteor.Error('user-dont-exist');
    }

    const userId = Accounts.createUser({ email: email,
      password: password,
      profile:{
      nome: name,
      datadenascimento: birthday,
      genero: gender,
      empresa: company,
      photo: photo[0].base64,
    }});
  },
  'Users.forgotpassword'(email, password) {
    check(email, String);
    check(password, String);

    if(!(Meteor.isServer && Accounts.findUserByEmail(email))){
      throw new Meteor.Error('user-dont-exist');
    }

    const userId = Accounts.findUserByEmail(email);

    Accounts.changePassword(userId, password);
  },
});
