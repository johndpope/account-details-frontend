
class MultiAccountCreateController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'USD';
    }

    this.currencies = [];

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

  onLookupSuccess(recipient) {
    this.uniqueIdRecipient = recipient;
  }
  onLookupFailure() {
    this.uniqueIdRecipient = false;
  }
  onLookupOverride(override) {
    this.overrideUniqueId = override;
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
