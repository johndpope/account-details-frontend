import angular from 'angular';
import AccountDetailsLegacyService from '../account-details-legacy';
import AccountDetailsService from './account-details.service';

export default angular
  .module('tw.account-details.service', [AccountDetailsLegacyService])
  .service('AccountDetailsService', AccountDetailsService).name;
