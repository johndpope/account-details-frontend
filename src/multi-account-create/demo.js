import angular from 'angular';
import template from './demo.html';
import component from './index';

class controller {
  onModelChange(model) {
    this.model = model;
  }
  log(message) { // eslint-disable-line
    console.log(message); // eslint-disable-line
  }
}

export default angular
  .module('tw.account-details.multi-create.demo', [component])
  .component('multiAccountCreateDemo', {
    controller,
    template
  }).name;
