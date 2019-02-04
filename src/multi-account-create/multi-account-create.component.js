import controller from './multi-account-create.controller';
import template from './multi-account-create.html';

const MultiAccountCreate = {
  controller,
  template,
  bindings: {
    profileId: '<',
    currency: '<',
    locale: '<',
    onChange: '<',
    onSuccess: '<',
    onFailure: '<',
    saveButtonLabel: '<'
  }
};

export default MultiAccountCreate;
