import controller from './multi-account-create.controller';
import template from './multi-account-create.html';

const MultiAccountCreate = {
  controller,
  template,
  bindings: {
    profile: '<',
    onChange: '&',
    onSuccess: '&',
    onFailure: '&'
  }
};

export default MultiAccountCreate;
