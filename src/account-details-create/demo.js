import angular from 'angular';
import template from './demo.html';
import component from './index';

class controller {
  onModelChange(model) {
    this.model = model;
    console.log('model changed', model); // eslint-disable-line
  }
  log(message) { // eslint-disable-line
    console.log(message); // eslint-disable-line
  }
}

export default angular
  .module('tw.account-details.create.demo', [component])
  .component('accountDetailsCreateDemo', {
    controller,
    template
  }).name;
