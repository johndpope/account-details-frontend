import angular from 'angular';

import AccountDetailsLegacy from './account-details-legacy/';
import AccountDetailsService from './account-details-service/';

export default angular.module('tw.account-details', [
  AccountDetailsLegacy,
  AccountDetailsService
]).name;
