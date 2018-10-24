'use strict';

describe('Given a component for looking up accounts by email', function() {
  var $compile,
      $scope,
      $q,
      $timeout,
      component,
      AccountDetailsService,
      useUniqueIdRadio,
      useManualRadio;

  var template = " \
    <account-email-lookup \
      on-change='onChange(email)' \
      on-use-unique-id='onUseUniqueId()' \
      on-enter-manually='onEnterManually()'> \
    </account-email-lookup>";

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();
    $q = $injector.get('$q');
    $timeout = $injector.get('$timeout');

    AccountDetailsService = $injector.get('AccountDetailsService');

    $scope.onUseUniqueId = jasmine.createSpy('onUseUniqueId');
    $scope.onEnterManually = jasmine.createSpy('onEnterManually');
    $scope.onChange = jasmine.createSpy('onChange');

    component = getComponent($compile, $scope, template);
  }));

  describe('when an email is entered in the input', function() {
    beforeEach(function() {
      spyOn(AccountDetailsService, 'lookupAccountByEmail').and.returnValue($q.resolve({data: emailLookupSuccess}));

      var input = component.querySelector('input[name=email]');
      input.value = 'test@test.com';
      input.dispatchEvent(new Event('input'));
      $timeout.flush();
    });

    it('should make a request to check it via the API', function() {
      expect(AccountDetailsService.lookupAccountByEmail).toHaveBeenCalledWith('test@test.com');
      expect(AccountDetailsService.lookupAccountByEmail.calls.count()).toBe(1);
    });
    it('should trigger the onChange handler with the email', function() {
      expect($scope.onChange).toHaveBeenCalledWith('test@test.com');
    });

    describe('and a receiving account is found', function() {
      beforeEach(function() {
        useUniqueIdRadio = component.querySelector('tw-radio[name=uniqueId] button');
        useManualRadio = component.querySelectorAll('tw-radio[name=uniqueId] button')[1];
      });

      it('should render an option to select it or enter manually', function() {
        expect(useUniqueIdRadio).toBeTruthy();
        expect(useManualRadio).toBeTruthy();
      });
      it('should preselect the option to use the matching account', function() {
        expect(useUniqueIdRadio.classList).toContain('checked');
      });
      it('should trigger the onUseUniqueId handler', function() {
        expect($scope.onUseUniqueId).toHaveBeenCalled();
        expect($scope.onUseUniqueId.calls.count()).toBe(1);
      });

      describe('but they choose to enter details manually', function() {
        beforeEach(function() {
          useManualRadio.dispatchEvent(new Event('click'));
        });

        it('should trigger the onEnterManually callback', function() {
          expect($scope.onEnterManually).toHaveBeenCalled();
          expect($scope.onEnterManually.calls.count()).toBe(1);
        });
      });
    });
  });

  describe('when a receiving account is not found', function() {
    beforeEach(function() {
      var deferred = $q.defer();
      spyOn(AccountDetailsService, 'lookupAccountByEmail').and.returnValue(deferred.promise);

      var input = component.querySelector('input[name=email]');
      input.value = 'test@test.com';
      input.dispatchEvent(new Event('input'));
      $timeout.flush();

      deferred.reject({});
      $scope.$apply();
    });

    it('should hide the option to choose the receiving account', function() {
      expect(component.querySelector('tw-radio')).toBeFalsy();
    });
    it('should trigger the onEnterManually handler', function() {
      expect($scope.onEnterManually).toHaveBeenCalled();
    });
  });
});

var emailLookupSuccess = {
  "type": "UNIQUEID",
  "receiverType": "PRIVATE",
  "email": "testy.mctest@gmail.com",
  "currency": "GBP",
  "uniqueId": {
    "type": "email",
    "value": "testy.mctest@gmail.com"
  },
  "targetRecipient":{
    "id": 12345678,
    "name": "Testy McTest",
    "currency": "GBP",
    "country": "gbr",
    "countryISO2Code": "GB",
    "email": "testy.mctest@gmail.com",
    "type": "SORT_CODE",
    "shortAccountString": "**************12345",
    "receiverType": "PRIVATE",
    "avatarUrl": null,
    "bankName": null,
    "accountNumber": "****2345"
  }
};
