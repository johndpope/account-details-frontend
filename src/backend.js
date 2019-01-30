import currencyList from '../docs/json/currency-list.json';

// import gbpRequirements from '../docs/json/gbp-requirements.json';
// import jpyRequirements from '../docs/json/jpy-requirements.json';
import usdRequirements from '../docs/json/usd-requirements.json';
// import vndRequirements from '../docs/json/vnd-requirements.json';
// import inrRequirements from '../docs/json/inr-requirements.json';
//
// import audRequirements from '../docs/json/v2-aud-requirements.json';

import jpyRefreshRequirements from '../docs/json/jpy-refresh-requirements.json';

import emailLookup from '../docs/json/email-lookup.json';
import emailLookupFailure from '../docs/json/email-lookup-failure.json';

import globalUsdCountries from '../docs/json/global-usd-countries.json';

function mockBackend($httpBackend) {
  // Mocks, we don't use these while connecting to V2, but it currently doesn't work as well
  // const gbpPath = /^\/account-requirements\?target=GBP/;
  const jpyPath = /^\/account-requirements\?target=JPY/;
  // const vndPath = /^\/account-requirements\?target=VND/;
  // const usdPath = /^\/account-requirements\?target=USD/;
  // const inrPath = /^\/account-requirements\?target=INR/;
  // const audPath = /^\/account-requirements\?target=AUD/;
  //
  // $httpBackend.whenGET(gbpPath).respond(gbpRequirements);
  // $httpBackend.whenGET(jpyPath).respond(jpyRequirements);
  // $httpBackend.whenGET(vndPath).respond(vndRequirements);
  // $httpBackend.whenGET(usdPath).respond(usdRequirements);
  // $httpBackend.whenGET(inrPath).respond(inrRequirements);
  // $httpBackend.whenGET(audPath).respond(audRequirements);

  $httpBackend.whenGET('/v2/quotes/123/account-requirements').respond(usdRequirements);

  // $httpBackend.whenPOST(gbpPath).respond(gbpRequirements);
  $httpBackend.whenPOST(jpyPath).respond(jpyRefreshRequirements);
  // $httpBackend.whenPOST(vndPath).respond(vndRequirements);
  // $httpBackend.whenPOST(usdPath).respond(usdRequirements);
  // $httpBackend.whenPOST(inrPath).respond(inrRequirements);
  // $httpBackend.whenPOST(audPath).respond(audRequirements);

  $httpBackend.whenGET('/api/v1/currency/list').respond(currencyList);

  $httpBackend.whenPOST('/v2/accounts').respond(() => [401, accountCreateErrors]);

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

  $httpBackend.whenGET(/.*/).passThrough();
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


export default mockBackend;
