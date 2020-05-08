import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    // Behavior
    sendVerificationEmail: false,
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});
