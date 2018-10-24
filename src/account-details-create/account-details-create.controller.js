class AccountDetailsCreateController {
  constructor($scope, AccountDetailsService) {
    this.$scope = $scope;
    this.AccountDetailsService = AccountDetailsService;

    this.validationMessages = {
      required: 'Field is required',
      pattern: 'Invalid format',
      minLength: 'Too short',
      maxLength: 'Too Long'
    };
    this.model = {};

    this.uniqueIdRecipient = false;
    this.hasDetails = true;
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'GBP';
    }

    this.$scope.$watch('$ctrl.model', (model, oldModel) => {
      if (model !== oldModel && this.onChange) {
        this.onChange({ model });
      }
    }, true);
  }

  $onChanges(changes) {
    if (changes.currency) {
      this.model.currency = changes.currency.currentValue || 'GBP';
    }

    if (changes.profile && changes.profile.currentValue) {
      this.model.profile = changes.profile.currentValue;
    }

    if (changes.currency || changes.quoteId) {
      this.loadRequirements();
    }
  }

  loadRequirements() {
    let promise;
    if (this.quoteId) {
      promise = this.AccountDetailsService.getRequirementsForQuote(
        this.quoteId,
        this.model.currency
      );
    } else {
      promise = this.AccountDetailsService.getRequirements(this.model.currency);
    }

    promise
      .then((response) => {
        this.alternatives = response.data;
        if (this.alternatives.length) {
          this.model.type = this.alternatives[0].type;
        }
      })
      .catch(this.handleRequirementsFailure);
  }

  refreshRequirements() {
    this.AccountDetailsService.refreshRequirements(this.model.currency, this.model)
      .then((response) => {
        this.alternatives = response.data;
      })
      .catch(this.handleRequirementsFailure);
  }

  handleRequirementsFailure(error) { //eslint-disable-line
    // TODO
  }

  saveAccount() {
    this.AccountDetailsService.save(this.model)
      .then(() => {
        if (this.onSuccess) {
          this.onSuccess();
        }
      })
      .catch((errors) => {
        this.errors = errors;
        if (this.onFailure) {
          this.onFailure();
        }
      });
  }

  onEmailChange(email) {
    this.model.email = email;
  }

  onUseUniqueId(recipient) {
    this.uniqueIdRecipient = recipient;
  }
  onEnterManually() {
    this.uniqueIdRecipient = false;
  }
}

AccountDetailsCreateController.$inject = ['$scope', 'AccountDetailsService'];

export default AccountDetailsCreateController;
