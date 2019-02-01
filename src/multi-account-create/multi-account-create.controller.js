
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

  onSaveSuccess() {
    if (this.onSuccess) {
      this.onSuccess();
    }
  }
  onSaveFailure() {
    if (this.onFailure) {
      this.onFailure();
    }
  }
  onDetailsModelChange(model) { // eslint-disable-line
    // It looks like we should be able to use 'this' instead of creating this
    // variable, yet when this executes 'this' is actually pointing to the child
    // 'AccountDetailsCreateController'.  Not sure why...
    if (bindings.onChange) {
      bindings.onChange(model);
    }
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
