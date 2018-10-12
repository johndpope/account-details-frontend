import controller from './account-details-create.controller';
import template from './account-details-create.html';

const AccountDetailsCreate = {
  controller,
  template,
  bindings: {
    currency: '<',
    profile: '<',
    onChange: '&',
    onSaveSuccess: '&',
    onSaveFailure: '&'
  }
};

export default AccountDetailsCreate;
