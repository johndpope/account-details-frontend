import angular from 'angular';
import AccountEmailLookup from './email-lookup.component';
import AccountDetailsService from '../account-details-service';

export default angular
  .module('tw.account-details.email-lookup', [AccountDetailsService])
  .component('accountEmailLookup', AccountEmailLookup).name;
