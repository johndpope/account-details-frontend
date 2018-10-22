
class MultiAccountCreateController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'USD';
    }

    this.currencies = [];
    // this.email = '';

    this.AccountDetailsService.getAccountCurrencies()
      .then((currencies) => {
        this.currencies = currencies;
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
