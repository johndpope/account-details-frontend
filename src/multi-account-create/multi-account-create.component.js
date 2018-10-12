import controller from './multi-account-create.controller';
import template from './multi-account-create.html';

const MultiAccountCreate = {
  controller,
  template,
  bindings: {
    profile: '<',
    onChange: '&',
    onSuccess: '&onSaveSuccess',
    onFailure: '&onSaveFailure'
  }
};

export default MultiAccountCreate;
