import angular from 'angular';
import MultiAccountCreate from './multi-account-create.component';
import AccountDetailsService from '../account-details-service/';
import AccountEmailLookup from '../email-lookup/';

export default angular
  .module('tw.account-details.multi-create', [
    AccountDetailsService,
    AccountEmailLookup
  ])
  .component('multiAccountCreate', MultiAccountCreate).name;
