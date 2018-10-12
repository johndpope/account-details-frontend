
import accountDetailsCreate from './account-details-create/demo.js';
import multiAccountCreate from './multi-account-create/demo.js';

import mockBackend from './backend.js';

const module = angular.module('tw.account-details.demo', [
  accountDetailsCreate,
  multiAccountCreate,
  'tw.styleguide-components'
]);

class PageController {

}

module.config(['$compileProvider', ($compileProvider) => {
  $compileProvider.debugInfoEnabled(false);
}]).controller('PageController', PageController);

angular.module('my-app', [
  'tw.account-details.demo',
  'ngMockE2E'
]).run(mockBackend);

export default module.name;
