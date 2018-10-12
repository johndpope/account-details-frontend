'use strict';

describe('Given a component for creating accounts', function() {
  var $compile,
      $scope,
      $q,
      component,
      alternatives,
      AccountDetailsService;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();
    $q = $injector.get('$q');

    AccountDetailsService = $injector.get('AccountDetailsService');

    alternatives = {
      data: [{
        type: "alternativeType",
        label: "Title",
        properties: {
          refresh: {
            type: "string",
            title: "Example title",
            refreshRequirementsOnChange: true,
            required: true
          }
        }
      }]
    };

    spyOn(AccountDetailsService, 'getRequirements')
      .and.returnValue($q.resolve(alternatives));

    $scope.onSaveSuccess = jasmine.createSpy('onSaveSuccess');
    $scope.onSaveFailure = jasmine.createSpy('onSaveFailure');
  }));

  describe('when initialised', function() {
    beforeEach(function() {
      $scope.currency = 'GBP';
      component = getComponent($scope);
    });

    it('should load the requirements from the account details service with the given currency', function() {
      expect(AccountDetailsService.getRequirements).toHaveBeenCalledWith('GBP');
    });

    it('should pass the requirements to the dynamic form', function() {
      // TODO this could be considerably better
      expect(component.querySelector('input')).toBeTruthy();
    });

    describe('when refresh requirements is triggered', function() {
      beforeEach(function() {
        spyOn(AccountDetailsService, 'refreshRequirements').and.returnValue($q.resolve(alternatives));
        component.querySelector('input').value = 'changed';
      });

      it('should refresh the requirements via account details service', function() {
        expect(AccountDetailsService.getRequirements).toHaveBeenCalledWith('GBP');
      });
    });

    describe('when the form is submitted ', function() {
      var submitButton, input;

      beforeEach(function() {
        submitButton = component.querySelector('input[type=submit]');
        input = component.querySelector('input[type=text]');
      });

      describe('and it is valid', function() {
        beforeEach(function() {
          spyOn(AccountDetailsService, 'save').and.returnValue($q.resolve());
          input.value = 'example';
          input.dispatchEvent(new Event('input'));
          submitButton.dispatchEvent(new Event('click'));
        });

        it('should use the service to send the data to the API', function() {
          expect(AccountDetailsService.save).toHaveBeenCalledWith({
            type: "alternativeType",
            currency: "GBP",
            refresh: "example"
          });
        });
      });

      describe('and it is invalid', function() {
        beforeEach(function() {
          spyOn(AccountDetailsService, 'save').and.returnValue($q.resolve({}));
          submitButton.dispatchEvent(new Event('click'));
        });

        it('should not send the data to the API', function() {
          expect(AccountDetailsService.save).not.toHaveBeenCalled();
        });
      });

      describe('and the API response is successful', function() {
        beforeEach(function() {
          spyOn(AccountDetailsService, 'save').and.returnValue($q.resolve({}));
          input.value = 'example';
          input.dispatchEvent(new Event('input'));
          submitButton.dispatchEvent(new Event('click'));
        });

        it('should trigger the onSaveSuccess handler', function() {
          expect($scope.onSaveSuccess).toHaveBeenCalled();
        });
        it('should not trigger the onSaveFailure handler', function() {
          expect($scope.onSaveFailure).not.toHaveBeenCalled();
        });
      });

      describe('and the API returns a failure', function() {
        beforeEach(function() {
          var errors = {
            refresh: "incorrect value"
          };

          var deferred = $q.defer();

          spyOn(AccountDetailsService, 'save').and.returnValue(deferred.promise);
          input.value = 'example';
          input.dispatchEvent(new Event('input'));
          submitButton.dispatchEvent(new Event('click'));

          deferred.reject(errors);
          $scope.$apply();
        });

        it('should pass any error messages to the dynamic form', function() {
          expect(component.innerText).toContain("incorrect value");
        });
        it('should not trigger the onSaveSuccess handler', function() {
          expect($scope.onSaveSuccess).not.toHaveBeenCalled();
        });
        it('should trigger the onSaveFailure handler', function() {
          expect($scope.onSaveFailure).toHaveBeenCalled();
        });
      });
    });

    describe('when the currency changes', function() {
      beforeEach(function() {
        $scope.currency = "USD";
        $scope.$apply();
      });
      it('should request the new requirements', function() {
        expect(AccountDetailsService.getRequirements).toHaveBeenCalledWith('USD');
      });
    });
  });

  function getComponent($scope) {
    var template = " \
      <account-details-create \
        currency='currency' \
        on-save-success='onSaveSuccess()' \
        on-save-failure='onSaveFailure()'> \
      </account-details-create>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
