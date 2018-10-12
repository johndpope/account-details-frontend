import angular from 'angular';
import AccountDetailsCreate from './account-details-create.component';
import AccountDetailsService from '../account-details-service/';

export default angular
  .module('tw.account-details.create', [
    AccountDetailsService,
    'tw.styleguide-components'
  ])
  .component('accountDetailsCreate', AccountDetailsCreate).name;
