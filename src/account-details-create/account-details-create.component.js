import controller from './account-details-create.controller';
import template from './account-details-create.html';

const AccountDetailsCreate = {
  controller,
  template,
  bindings: {
    currency: '<',
    profileId: '<',
    email: '<',
    onChange: '&',
    onSuccess: '&',
    onFailure: '&'
  }
};

export default AccountDetailsCreate;
