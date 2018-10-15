import angular from 'angular';
import MultiAccountCreate from './multi-account-create.component';
import AccountDetailsService from '../account-details-service/';

export default angular
  .module('tw.account-details.multi-create', [AccountDetailsService])
  .component('multiAccountCreate', MultiAccountCreate).name;
