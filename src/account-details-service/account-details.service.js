
class AccountDetailsService {
  constructor($http, $q, AccountDetailsLegacyService) {
    this.$http = $http;
    this.$q = $q;
    this.LegacyService = AccountDetailsLegacyService;
  }

  /**
   * Get the account requirments for a currency
   * Live calls, use source/sourceAmount for special cases
   * {{host}}/v1/account-requirements?source=EUR&target=USD&sourceAmount=1000
   */
  getRequirements(currency, country) {
    if (!currency) {
      throw new Error('Currency is required');
    }

    const options = getRequirementsHttpOptions(
      currency,
      this.LegacyService,
      this.$http
    );

    const path = getRequirementsPath(currency, country);

    let promise = this.$http.get(path, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(country, promise, this.$http);
    }

    return promise;
  }

  getRequirementsForQuote(quoteId, currency, country) {
    if (!quoteId || !currency) {
      throw new Error('Quote id and currency are required');
    }

    const options = getRequirementsHttpOptions(
      currency,
      this.LegacyService,
      this.$http
    );

    const path = `/quotes/${quoteId}/account-requirements`;

    let promise = this.$http.get(path, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(country, promise, this.$http);
    }

    return promise;
  }

  /**
   * Refresh account requirments for a currency using an existing model
   */
  refreshRequirements(currency, model) {
    if (!currency) {
      throw new Error('Currency is required');
    }
    const apiModel = this.LegacyService.formatModelForAPI(model);

    const options = getRequirementsHttpOptions(
      currency,
      this.LegacyService,
      this.$http
    );

    const path = getRequirementsPath(currency, model.country);

    let promise = this.$http.post(path, apiModel, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(model.country, promise, this.$http);
    }

    return promise;
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
    const apiModel = this.LegacyService.formatModelForAPI(model);
    return this.$http.post('/accounts', apiModel)
      .catch((response) => {
        const formattedErrors =
          this.LegacyService.formatErrorsForDisplay(response.data);
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

  getTargetCountries(currency) {
    if (currency === 'USD') {
      return this.$http.get('/api/v1/country/listGlobalUsdCountries')
        .then((response) => {
          response.data = response.data.countries.map(country => ({
            value: country.iso2Code,
            label: country.name
          }));
          return response;
        })
        .catch(() => ({ data: [{ currency: 'USD' }] }));
    }
    return this.$q.when({ data: [{ currency: 'GBP' }] });
  }
}

function getRequirementsPath(currency, country) {
  let path = `/account-requirements?target=${currency}`;
  if (country) {
    path += `&country=${country}`;
  }
  return path;
}

/**
 * We use transformers rather than a 'then', as in Angular >1.5, using a 'then'
 * without a catch throws a warning, and we do not want to catch at this point.
 */
function getRequirementsHttpOptions(currency, LegacyService, $http) {
  return {
    transformResponse: getResponseTransformers(
      (data, headers, status) => handleRequirementsResponse(
        currency,
        data,
        status,
        LegacyService
      ),
      $http
    )
  };
}

/**
 * Update successful responses to remove any legacy
 */
function handleRequirementsResponse(
  currency,
  data,
  status,
  LegacyService
) {
  if (status === 200) {
    return LegacyService.prepareResponse(currency, data);
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
