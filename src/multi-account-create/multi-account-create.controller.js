
let bindings;

class MultiAccountCreateController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;

    // TODO translations
    this.translations = {
      currency: {
        label: 'Currency',
        placeholder: 'Choose currency'
      }
    };

    bindings = this;
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'USD';
    }
    if (!this.locale) {
      this.locale = 'en-GB';
    }

    this.currencies = [];
    // this.email = '';

    this.AccountDetailsService.getAccountCurrencies()
      .then((response) => {
        this.currencies = response.data;
      })
      .catch(() => {
        // TODO
      });
  }

  // Inthese callback handlers it looks like we should be able to use 'this',
  // instead of creating the bindings variable, yet when this executes 'this'
  // is actually pointing to the child 'AccountDetailsCreateController'.
  // I think webpack must convert this to an arrow function and pass by reference
  // losing the parent scope.
  onSaveSuccess() { // eslint-disable-line
    triggerCallback(bindings.onSuccess);
  }
  onSaveFailure() { // eslint-disable-line
    triggerCallback(bindings.onFailure);
  }
  onDetailsModelChange(model) { // eslint-disable-line
    triggerCallback(bindings.onChange, model);
  }
}

function triggerCallback(callback, data) {
  if (typeof callback === 'function') {
    callback(data);
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
