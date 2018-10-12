class AccountDetailsCreateController {
  constructor($scope, AccountDetailsService) {
    this.$scope = $scope;
    this.AccountDetailsService = AccountDetailsService;

    this.validationMessages = {
      required: 'Field is required'
    };
    this.model = {};
  }

  $onInit() {
    if (!this.currency) {
      this.currency = 'GBP';
    }

    this.loadRequirements();

    this.$scope.$watch('$ctrl.model', (model, oldModel) => {
      if (model !== oldModel && this.onChange) {
        this.onChange({ model });
      }
    }, true);
  }

  $onChanges(changes) {
    if (changes.currency) {
      this.model.currency = changes.currency.currentValue || 'GBP';
      this.loadRequirements();
    }
    if (changes.profile && changes.profile.currentValue) {
      this.model.profile = changes.profile.currentValue;
    }
  }

  loadRequirements() {
    this.AccountDetailsService.getRequirements(this.model.currency)
      .then((response) => {
        this.alternatives = response.data;
        if (this.alternatives.length) {
          this.model.type = this.alternatives[0].type;
        }
      })
      .catch(() => {
        // TODO
      });
  }

  refreshRequirements() {
    this.AccountDetailsService.refreshRequirements(this.model.currency, this.model)
      .then((response) => {
        this.alternatives = response.data;
      })
      .catch(() => {
        // TODO
      });
  }

  saveAccount() {
    this.AccountDetailsService.save(this.model)
      .then(() => {
        if (this.onSaveSuccess) {
          this.onSaveSuccess();
        }
      })
      .catch((errors) => {
        this.errors = errors;
        if (this.onSaveFailure) {
          this.onSaveFailure();
        }
      });
  }
}

AccountDetailsCreateController.$inject = ['$scope', 'AccountDetailsService'];

export default AccountDetailsCreateController;
