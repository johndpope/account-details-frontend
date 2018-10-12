
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

  onEmailChange() {
    this.AccountDetailsService.lookupAccountByEmail(this.email)
      .then(() => {
        // TODO
      })
      .catch(() => {
        console.log('no email found'); // eslint-disable-line
      });
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

export default MultiAccountCreateController;
