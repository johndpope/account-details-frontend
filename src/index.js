import angular from 'angular';

import AccountDetailsLegacy from './account-details-legacy/';
import AccountDetailsService from './account-details-service/';
import AccountDetailsCreate from './account-details-create/';

export default angular.module('tw.account-details', [
  AccountDetailsLegacy,
  AccountDetailsService,
  AccountDetailsCreate
]).name;
