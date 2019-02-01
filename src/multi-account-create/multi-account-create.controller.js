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
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'USD';
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

  onModelChange(model) {
    if (this.onChange) {
      this.onChange({ model });
    }
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
