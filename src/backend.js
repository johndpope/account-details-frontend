
import gbpRequirements from '../demo/json/gbp-requirements.json';
import jpyRequirements from '../demo/json/jpy-requirements.json';
import usdRequirements from '../demo/json/usd-requirements.json';
import vndRequirements from '../demo/json/vnd-requirements.json';

import jpyRefreshRequirements from '../demo/json/jpy-refresh-requirements.json';

import emailLookup from '../demo/json/email-lookup.json';
import emailLookupFailure from '../demo/json/email-lookup-failure.json';

function mockBackend($httpBackend) {
  const requirementsPath = '/account-requirements';

  $httpBackend.whenGET(`${requirementsPath}?currency=GBP`).respond(gbpRequirements);
  $httpBackend.whenGET(`${requirementsPath}?currency=JPY`).respond(jpyRequirements);
  $httpBackend.whenGET(`${requirementsPath}?currency=USD`).respond(usdRequirements);
  $httpBackend.whenGET(`${requirementsPath}?currency=VND`).respond(vndRequirements);

  $httpBackend.whenPOST(`${requirementsPath}?currency=JPY`).respond(jpyRefreshRequirements);
  $httpBackend.whenPOST(`${requirementsPath}?currency=VND`).respond(vndRequirements);

  $httpBackend.whenGET('/account-currencies').respond(accountCurrencies);

  $httpBackend.whenPOST('/accounts').respond(() => [401, accountCreateErrors]);

  $httpBackend.whenPOST('/api/v1/uniqueId/uniqueIdLookUp').respond((method, path, data) => {
    const json = JSON.parse(data);
    if (json.email && json.email.indexOf('@') > 0) {
      return [200, emailLookup];
    }
    return [404, emailLookupFailure];
  });
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
}];

export default mockBackend;
