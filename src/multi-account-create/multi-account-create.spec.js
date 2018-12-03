'use strict';

describe('Given a component for creating accounts of any currency', function() {
  var $compile,
      $scope,
      $q,
      component,
      AccountDetailsService,
      accountDetailsCreate;

  var template = " \
    <multi-account-create \
      on-change='onChange()' \
      on-success='onSuccess()' \
      on-failure='onFailure()'> \
    </multi-account-create>";

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(function() {
    accountDetailsCreate = getMockComponent('accountDetailsCreate');
    angular.mock.module('tw.account-details.create', accountDetailsCreate);
  });

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $q = $injector.get('$q');
    $scope = $injector.get('$rootScope').$new();

    AccountDetailsService = $injector.get('AccountDetailsService');

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onSuccess = jasmine.createSpy('onSuccess');
    $scope.onFailure = jasmine.createSpy('onFailure');
  }));

  describe('when initialised', function() {
    beforeEach(function() {
      spyOn(AccountDetailsService, 'getAccountCurrencies').and.returnValue(
        $q.resolve({data:[]})
      );
      component = getComponent($compile, $scope, template);
    });

    it('should load the currencies from the account details service', function() {
      expect(AccountDetailsService.getAccountCurrencies).toHaveBeenCalled();
    });
    it('should default the currency to USD and pass to account-details-create component', function() {
      expect(accountDetailsCreate.bindings.currency).toBe('USD');
    });

    describe('when account-details-create triggers success', function() {
      beforeEach(function() {
        accountDetailsCreate.bindings.onSuccess();
      });

      it('should trigger its own onSuccess handler ', function() {
        expect($scope.onSuccess).toHaveBeenCalled();
      });
    });

    describe('when account-details-create triggers failure', function() {
      beforeEach(function() {
        accountDetailsCreate.bindings.onFailure();
      });

      it('should trigger its own onFailure handler ', function() {
        expect($scope.onFailure).toHaveBeenCalled();
      });
    });

    describe('when account-details-create triggers onChange', function() {
      beforeEach(function() {
        accountDetailsCreate.bindings.onChange();
      });

      it('should trigger its own onChange handler with the model', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });
  });
});
