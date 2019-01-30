class AccountDetailsCreateController {
  constructor($scope, AccountDetailsService) {
    this.$scope = $scope;
    this.AccountDetailsService = AccountDetailsService;

    // TODO translations
    this.translations = {
      validation: {
        required: 'Field is required',
        pattern: 'Invalid format',
        minLength: 'The value is too short',
        maxLength: 'Too value is too long',
        min: 'The value is too low',
        max: 'Too value is too high'
      },
      country: {
        label: 'Which country is their account in?',
      },
      accountDetails: {
        label: 'Do you have their account details?',
        value: 'Yes, I have their details',
        info: `No problem, we'll send your recipient an email asking them where
          they want to receive the money.`
      }
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

      this.AccountDetailsService.getTargetCountries(this.model.currency)
        .then((response) => {
          this.targetCountries = response.data;

          // Default to US for global USD
          // TODO find a way to do this more generically
          if (this.model.currency === 'USD') {
            this.model.country = 'US';
          }

          if (this.targetCountries && this.targetCountries.length <= 1) {
            delete this.model.country;
          }
        })
        .catch(() => {
          // getTargetCountries catches errors and returns a single country
        });
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
      promise = this.AccountDetailsService.getRequirements(
        this.model.currency,
        this.model.country
      );
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
    this.AccountDetailsService.refreshRequirements(
      this.model.currency,
      this.model
    ).then((response) => {
      this.alternatives = response.data;
    }).catch(this.handleRequirementsFailure);
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

  isCountrySelectorVisible() {
    return !this.uniqueIdRecipient &&
      this.hasDetails &&
      this.targetCountries &&
      this.targetCountries.length > 1;
  }

  isAccountFormVisible() {
    return !this.uniqueIdRecipient && this.hasDetails;
  }
}

AccountDetailsCreateController.$inject = ['$scope', 'AccountDetailsService'];

export default AccountDetailsCreateController;