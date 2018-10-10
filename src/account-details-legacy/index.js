import angular from 'angular';
import AccountDetailsLegacyService from './account-details-legacy.service';

export default angular
  .module('tw.account-details.legacy', [])
  .service('AccountDetailsLegacyService', AccountDetailsLegacyService).name;
