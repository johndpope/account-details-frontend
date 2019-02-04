import controller from './email-lookup.controller';
import template from './email-lookup.html';

const AccountEmailLookup = {
  controller,
  template,
  bindings: {
    locale: '<',
    onChange: '&',
    onUseUniqueId: '&',
    onEnterManually: '&'
  }
};

export default AccountEmailLookup;
