
class MultiAccountCreateController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;
    this.uniqueIdRecipient = false;
    this.hasDetails = true;
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
  onEmailChange(email) {
    this.email = email;
  }

  onUseUniqueId(recipient) {
    this.uniqueIdRecipient = recipient;
  }
  onEnterManually() {
    this.uniqueIdRecipient = false;
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
