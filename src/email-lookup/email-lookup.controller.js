
class AccountEmailLookupController {
  constructor(AccountDetailsService) {
    this.AccountDetailsService = AccountDetailsService;
  }

  onEmailChange() {
    this.AccountDetailsService.lookupAccountByEmail(this.email)
      .then((response) => {
        this.uniqueIdRecipient = response.data.targetRecipient;
        this.useUniqueId = true;
        if (this.onSuccess) {
          this.onSuccess({ recipient: response.data });
        }
        if (this.onOverride) {
          this.onOverride({ override: true });
        }
      })
      .catch(() => {
        this.uniqueIdRecipient = false;
        this.useUniqueId = false;
        if (this.onFailure) {
          this.onFailure();
        }
      });
  }

  onOverrideUniqueId(bool) {
    if (this.onOverride) {
      this.onOverride({ override: bool });
    }
  }
}

AccountEmailLookupController.$inject = ['AccountDetailsService'];

export default AccountEmailLookupController;
