
const module = angular.module('tw.account-details.demo', [
  'tw.styleguide-components'
]);

class PageController { }

module.config(['$compileProvider', ($compileProvider) => {
  $compileProvider.debugInfoEnabled(false);
}]).controller('PageController', PageController);


angular.module('my-app', []);

export default module.name;
