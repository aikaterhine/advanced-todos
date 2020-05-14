import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default () => {

  Accounts.config({
      // Behavior
      sendVerificationEmail: false,
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
  });

  Accounts.onCreateUser(function(options, user) {
    return _.extend(user, {...options});
  });

  Accounts.onCreateUser((options, user) => {

    user.profile = options.profile ? options.profile : {};
    user.admin = options.admin;

    // send verification mail
    // Meteor.setTimeout(function() {
    //   Accounts.sendVerificationEmail(user._id);
    // }, 2 * 1000);

    return user;
  });
}
