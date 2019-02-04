import controller from './account-details-create.controller';
import template from './account-details-create.html';

const AccountDetailsCreate = {
  controller,
  template,
  bindings: {
    currency: '<',
    quoteId: '<',
    profileId: '<',
    locale: '<',
    onChange: '<',
    onSuccess: '<',
    onFailure: '<',
    saveButtonLabel: '<'
  }
};

export default AccountDetailsCreate;
