
class AccountEmailLookupController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;
    this.requestCount = 0;
    this.lastResponse = 0;

    // TODO translations
    this.translations = {
      email: {
        label: 'Email address',
        placeholder: 'Recipient email address',
        success: `is already on TransferWise, and would like to receive into the
          following account.`
      },
      uniqueId: {
        label: 'How do you want to send?',
        toUniqueId: 'account ending',
        toBankDetails: 'Send to a different account'
      }
    };
  }

  onEmailChange() {
    if (this.onChange) {
      this.onChange({ email: this.email });
    }

    if (!this.email) {
      this.recipient = false;
      this.useUniqueId = false;
      return;
    }

    this.requestCount++;
    const requestCountAtCall = this.requestCount;

    this.AccountDetailsService.lookupAccountByEmail(this.email)
      .then((response) => {
        if (this.lastResponse > requestCountAtCall) {
          // We already received a response from a subsequent call, so throw this away
          return;
        }
        this.recipient = response.data.targetRecipient;
        this.useUniqueId = true;
        this.selectUniqueId();
      })
      .catch(() => {
        if (this.lastResponse > requestCountAtCall) {
          // We already received a response from a subsequent call, so throw this away
          return;
        }
        this.selectManual();
        this.recipient = false;
        this.useUniqueId = false;
      })
      .finally(() => {
        this.lastResponse = Math.max(requestCountAtCall, this.lastResponse);
      });
  }

  selectUniqueId() {
    if (this.onUseUniqueId) {
      this.onUseUniqueId({ recipient: this.recipient });
    }
  }

  selectManual() {
    if (this.onEnterManually) {
      this.onEnterManually();
    }
  }

  onChangeUniqueIdChoice(args) {
    if (args.useUniqueId) {
      this.selectUniqueId();
    } else {
      this.selectManual();
    }
  }
}

AccountEmailLookupController.$inject = ['AccountDetailsService'];

export default AccountEmailLookupController;
