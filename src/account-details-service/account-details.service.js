
class AccountDetailsService {
  constructor($http, $q, AccountDetailsLegacyService) {
    this.$http = $http;
    this.$q = $q;
    this.LegacyService = AccountDetailsLegacyService;

    this.domain = 'https://api.transferwise.com';
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

    let promise = this.$http.get(this.domain + path, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(country, promise);
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

    const path = `/v2/quotes/${quoteId}/account-requirements`;

    let promise = this.$http.get(this.domain + path, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(country, promise);
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

    let promise = this.$http.post(this.domain + path, apiModel, options);

    // TODO this shit is here because global USD APIs are a mess, this should be removed
    if (currency === 'USD') {
      promise = this.LegacyService.modifyUSD(model.country, promise);
    }

    return promise;
  }

  /**
   * Get the list of currencies for which we can create accounts
   */
  getAccountCurrencies() {
    const path = '/api/v1/currency/list';
    const options = getCurrencyListHttpOptions(this.$http);
    return this.$http.get(path, options);
  }

  /**
   * Save a new account
   */
  save(model) {
    if (!model) {
      throw new Error('Model is required');
    }
    const apiModel = this.LegacyService.formatModelForAPI(model);

    const options = getSaveHttpOptions(this.$http, this.LegacyService);

    const path = '/v2/accounts';

    return this.$http.post(this.domain + path, apiModel, options);
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
      const options = {
        headers: {
          'x-authorization-key': 'dad99d7d8e52c2c8aaf9fda788d8acdc',
          'x-authorization-token': '84b46a3a69d6443c94e0b55882ab271d',
          'x-language': 'en'
        },
      };
      const path = '/api/v1/country/listGlobalUsdCountries';
      const domain = ''; // '//transferwise.com';

      return this.$http.get(domain + path, options)
        .then((response) => {
          response.data = response.data.countries.map(country => ({
            value: country.iso2Code,
            label: country.name
          }));
          return response;
        })
        // If the call fails return a single currency to disable global USD
        .catch(() => ({ data: [{ currency: 'USD' }] }));
    }
    return this.$q.when({ data: [{ currency: 'GBP' }] });
  }
}

function getRequirementsPath(currency, country) {
  let path = `/v2/account-requirements?targetCurrency=${currency}`;

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

function getCurrencyListHttpOptions($http) {
  return {
    transformResponse: getResponseTransformers(
      (data, headers, status) => handleCurrencyListResponse(
        data,
        status,
      ),
      $http
    )
  };
}

function handleCurrencyListResponse(data, status) {
  if (status === 200) {
    return data.currencies.map(mapCurrencyToOption);
  }
  return data;
}

function mapCurrencyToOption(currency) {
  return {
    value: currency.code,
    label: currency.name,
    currency: currency.code,
    searchable: currency.countryKeywords ?
      currency.countryKeywords.reduce((acc, cur) => `${acc}, ${cur}`) : ''
  };
}

/**
 * We use transformers rather than a 'then', as in Angular >1.5, using a 'then'
 * without a catch throws a warning, and we do not want to catch at this point.
 */
function getSaveHttpOptions($http, LegacyService) {
  return {
    transformResponse: getResponseTransformers(
      (data, headers, status) => handleSaveResponse(data, status, LegacyService),
      $http
    )
  };
}

function handleSaveResponse(data, status, LegacyService) {
  if (status === 200) {
    return data;
  }
  return LegacyService.formatErrorsForDisplay(data);
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
