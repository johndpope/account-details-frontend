
class AccountDetailsService {
  constructor($http, $q, AccountDetailsLegacyService) {
    this.$http = $http;
    this.$q = $q;
    this.AccountDetailsLegacyService = AccountDetailsLegacyService;
  }

  /**
   * Get the account requirments for a currency
   */
  getRequirements(currency) {
    if (!currency) {
      throw new Error('Currency is required');
    }

    const options = getRequirementsHttpOptions(
      currency,
      this.AccountDetailsLegacyService,
      this.$http
    );

    return this.$http.get(`/account-requirements?currency=${currency}`, options);
  }

  /**
   * Refresh account requirments for a currency using an existing model
   */
  refreshRequirements(currency, model) {
    if (!currency) {
      throw new Error('Currency is required');
    }
    const apiModel = this.AccountDetailsLegacyService.formatModelForAPI(model);

    const options = getRequirementsHttpOptions(
      currency,
      this.AccountDetailsLegacyService,
      this.$http
    );

    return this.$http.post(`/account-requirements?currency=${currency}`, apiModel, options);
  }

  /**
   * Get the list of currencies for which we can create accounts
   */
  getAccountCurrencies() {
    return this.$http.get('/account-currencies')
      .then(response => response.data)
      .catch(angular.noop);
  }

  /**
   * Save a new account
   */
  save(model) {
    if (!model) {
      throw new Error('Model is required');
    }
    const apiModel = this.AccountDetailsLegacyService.formatModelForAPI(model);
    return this.$http.post('/accounts', apiModel)
      .catch((response) => {
        const formattedErrors =
          this.AccountDetailsLegacyService.formatErrorsForDisplay(response.data);
        return this.$q.reject(formattedErrors).catch(angular.noop);
      });
  }

  /**
   * Do a lookup to see if we have any accounts for given email
   */
  lookupAccountByEmail(email) {
    if (!email) {
      throw new Error('Email is required');
    }
    const type = 'email';
    const currencyCode = 'GBP';
    return this.$http.post('/api/v1/uniqueId/uniqueIdLookUp', {
      email, type, currencyCode
    });
  }
}

/**
 * We use transformers rather than a 'then', as in Angular >1.5, using a 'then'
 * without a catch throws a warning, and we do not want to catch at this point.
 */
function getRequirementsHttpOptions(currency, AccountDetailsLegacyService, $http) {
  return {
    transformResponse: getResponseTransformers(
      (data, headers, status) => handleRequirementsResponse(
        currency,
        data,
        status,
        AccountDetailsLegacyService
      ),
      $http
    )
  };
}

/**
 * Update successful responses to remove any legacy
 */
function handleRequirementsResponse(currency, data, status, AccountDetailsLegacyService) {
  if (status === 200) {
    return AccountDetailsLegacyService.prepareResponse(currency, data);
  }
  return data;
}

/**
 * Append new transform rather than replacing any already present.
 */
function getResponseTransformers(responseTransformer, $http) {
  return $http.defaults.transformResponse &&
    $http.defaults.transformResponse.concat &&
    $http.defaults.transformResponse.concat(responseTransformer);
}

AccountDetailsService.$inject = ['$http', '$q', 'AccountDetailsLegacyService'];

export default AccountDetailsService;
