import angular from 'angular';
import template from './demo.html';
import component from './index';

let ctrl;

class controller {
  constructor() {
    ctrl = this;
    ctrl.model = {};

    this.locale = 'en-GB';
    this.locales = [{
      value: 'fr-FR',
      label: 'French'
    }, {
      value: 'en-GB',
      label: 'English'
    }];
  }

  onModelChange(model) { // eslint-disable-line
    ctrl.model = model;
    console.log('model changed', model); // eslint-disable-line
  }
  logSuccess() { // eslint-disable-line
    console.log('success'); // eslint-disable-line
  }
  logFailure() { // eslint-disable-line
    onsole.log('failure'); // eslint-disable-line
  }
}

export default angular
  .module('tw.account-details.multi-create.demo', [component])
  .component('multiAccountCreateDemo', {
    controller,
    template
  }).name;
