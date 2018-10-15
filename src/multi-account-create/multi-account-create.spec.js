'use strict';

describe('Given a component for creating accounts of any currency', function() {
  var $compile,
      $scope,
      $q,
      component,
      AccountDetailsService;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $q = $injector.get('$q');
    $scope = $injector.get('$rootScope').$new();

    AccountDetailsService = $injector.get('AccountDetailsService');
  }));

  describe('when initialised', function() {
    beforeEach(function() {
      spyOn(AccountDetailsService, 'getAccountCurrencies').and.returnValue($q.resolve([]));

      // TODO mock out child component and remove this
      spyOn(AccountDetailsService, 'getRequirements').and.returnValue($q.resolve([]));

      component = getComponent($scope);
    });

    it('should load the currencies from the account details service', function() {
      expect(AccountDetailsService.getAccountCurrencies).toHaveBeenCalled();
    });
  });

  function getComponent($scope) {
    var template = " \
      <multi-account-create> \
      </multi-account-create>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
