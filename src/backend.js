
import gbpRequirements from '../demo/json/gbp-requirements.json';
import jpyRequirements from '../demo/json/jpy-requirements.json';
import usdRequirements from '../demo/json/usd-requirements.json';
import vndRequirements from '../demo/json/vnd-requirements.json';
import inrRequirements from '../demo/json/inr-requirements.json';

import audRequirements from '../demo/json/v2-aud-requirements.json';

import jpyRefreshRequirements from '../demo/json/jpy-refresh-requirements.json';

import emailLookup from '../demo/json/email-lookup.json';
import emailLookupFailure from '../demo/json/email-lookup-failure.json';

import globalUsdCountries from '../demo/json/global-usd-countries.json';

function mockBackend($httpBackend) {
  const gbpPath = /^\/account-requirements\?target=GBP/;
  const jpyPath = /^\/account-requirements\?target=JPY/;
  const vndPath = /^\/account-requirements\?target=VND/;
  const usdPath = /^\/account-requirements\?target=USD/;
  const inrPath = /^\/account-requirements\?target=INR/;
  const audPath = /^\/account-requirements\?target=AUD/;

  $httpBackend.whenGET(gbpPath).respond(gbpRequirements);
  $httpBackend.whenGET(jpyPath).respond(jpyRequirements);
  $httpBackend.whenGET(vndPath).respond(vndRequirements);
  $httpBackend.whenGET(usdPath).respond(usdRequirements);
  $httpBackend.whenGET(inrPath).respond(inrRequirements);
  $httpBackend.whenGET(audPath).respond(audRequirements);

  $httpBackend.whenGET('/quotes/123/account-requirements').respond(usdRequirements);

  $httpBackend.whenPOST(gbpPath).respond(gbpRequirements);
  $httpBackend.whenPOST(jpyPath).respond(jpyRefreshRequirements);
  $httpBackend.whenPOST(vndPath).respond(vndRequirements);
  $httpBackend.whenPOST(usdPath).respond(usdRequirements);
  $httpBackend.whenPOST(inrPath).respond(inrRequirements);
  $httpBackend.whenPOST(audPath).respond(audRequirements);

  $httpBackend.whenGET('/account-currencies').respond(accountCurrencies);

  $httpBackend.whenPOST('/accounts').respond(() => [401, accountCreateErrors]);

  $httpBackend.whenPOST('/api/v1/uniqueId/uniqueIdLookUp').respond((method, path, data) => {
    const json = JSON.parse(data);
    if (json.email && json.email.indexOf('@') > 0) {
      return [200, emailLookup];
    }
    return [404, emailLookupFailure];
  });

  $httpBackend.whenGET('/api/v1/country/listGlobalUsdCountries').respond(globalUsdCountries);

  const swiftFormatRegex =
    /^\/api\/v1\/recipient\/swiftAccountNumberFormat\?recipientCountry=[A-Z]{2}/;

  $httpBackend.whenGET('/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=GB')
    .respond({ accountNumberFormat: 'ACCOUNT_NUMBER' });
  $httpBackend.whenGET(swiftFormatRegex)
    .respond({ accountNumberFormat: 'IBAN' });
}

const accountCreateErrors = [{
  code: 'NOT_VALID',
  message: 'Incorrect value',
  path: 'sortCode'
}, {
  code: 'REQUIRED',
  message: 'Required',
  path: 'name'
}];

const accountCurrencies = [{
  value: 'USD',
  label: 'United States Dollar'
}, {
  value: 'GBP',
  label: 'Great British Pound'
}, {
  value: 'JPY',
  label: 'Japanese Yen'
}, {
  value: 'VND',
  label: 'Vietnamese Dong'
}, {
  value: 'INR',
  label: 'Indian'
}, {
  value: 'AUD',
  label: 'Australian Dollar'
}];

export default mockBackend;
