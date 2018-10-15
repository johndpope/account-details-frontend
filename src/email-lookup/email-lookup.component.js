import controller from './email-lookup.controller';
import template from './email-lookup.html';

const AccountEmailLookup = {
  controller,
  template,
  bindings: {
    onSuccess: '&',
    onFailure: '&',
    onOverride: '&'
  }
};

export default AccountEmailLookup;
