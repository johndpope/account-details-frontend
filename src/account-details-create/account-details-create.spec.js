'use strict';

describe('Given a component for creating accounts', function() {
  var $compile,
      $scope,
      $q,
      component,
      alternatives,
      AccountDetailsService;

  var template = " \
    <account-details-create \
      currency='currency' \
      quote-id='quoteId' \
      locale='locale' \
      on-success='onSuccess' \
      on-failure='onFailure' \
      save-button-label='saveButtonLabel'> \
    </account-details-create>";

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

    spyOn(AccountDetailsService, 'getRequirementsForQuote')
      .and.returnValue($q.resolve(alternatives));

    $scope.currency = 'GBP';
    $scope.locale = 'fr-FR';
    $scope.saveButtonLabel = 'Button Label';
    $scope.onSuccess = jasmine.createSpy('onSuccess');
    $scope.onFailure = jasmine.createSpy('onFailure');
  }));

  describe('when initialised', function() {
    beforeEach(function() {
      component = getComponent($compile, $scope, template);
    });

    it('should load the requirements from the account details service with the given currency', function() {
      expect(AccountDetailsService.getRequirements).toHaveBeenCalledWith('GBP', 'fr-FR', undefined);
      expect(AccountDetailsService.getRequirements.calls.count()).toBe(1);
    });

    it('should render the dynamic form', function() {
      expect(component.querySelector('input[name=refresh]')).toBeTruthy();
    });

    it('should use the supplied button label', function() {
      expect(component.querySelector('input[type=submit]').value).toBe($scope.saveButtonLabel);
    });

    describe('when refresh requirements is triggered', function() {
      beforeEach(function() {
        spyOn(AccountDetailsService, 'refreshRequirements').and.returnValue($q.resolve(alternatives));
        component.querySelector('input').value = 'changed';
      });

      it('should refresh the requirements via account details service', function() {
        expect(AccountDetailsService.getRequirements).toHaveBeenCalledWith('GBP', 'fr-FR', undefined);
      });
    });

    describe('when the form is submitted ', function() {
      var submitButton, input, deferred, promise;

      beforeEach(function() {
        submitButton = component.querySelector('input[type=submit]');
        input = component.querySelector('input[type=text]');
        deferred = $q.defer();

        spyOn(AccountDetailsService, 'save').and.returnValue(deferred.promise)
      });

      describe('and it is valid', function() {
        beforeEach(function() {
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

        describe('and the API response is successful', function() {
          beforeEach(function() {
            deferred.resolve({});
            $scope.$apply();
          });

          it('should trigger the onSuccess handler', function() {
            expect($scope.onSuccess).toHaveBeenCalled();
          });
          it('should not trigger the onFailure handler', function() {
            expect($scope.onFailure).not.toHaveBeenCalled();
          });
        });

        describe('and the API returns a failure', function() {
          beforeEach(function() {
            var errors = {
              refresh: "incorrect value"
            };

            deferred.reject(errors);
            $scope.$apply();
          });

          it('should pass any error messages to the dynamic form', function() {
            expect(component.innerText).toContain("incorrect value");
          });
          it('should not trigger the onSuccess handler', function() {
            expect($scope.onSuccess).not.toHaveBeenCalled();
          });
          it('should trigger the onFailure handler', function() {
            expect($scope.onFailure).toHaveBeenCalled();
          });
        });
      });

      describe('and it is invalid', function() {
        beforeEach(function() {
          submitButton.dispatchEvent(new Event('click'));
        });

        it('should not send the data to the API', function() {
          expect(AccountDetailsService.save).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the currency changes', function() {
      var deferred;
      beforeEach(function() {
        deferred = $q.defer();
        spyOn(AccountDetailsService, 'getTargetCountries').and.returnValue(deferred.promise);
        $scope.currency = 'USD';
        $scope.$apply();
      });

      it('should load the available target countries', function() {
        expect(AccountDetailsService.getTargetCountries).toHaveBeenCalledWith('USD');
      });

      describe('and more than one target country is returned', function() {
        beforeEach(function() {
          deferred.resolve({
            data: [{
              value: 'US',
              label: 'United States'
            },{
              value: 'CA',
              label: 'Canada'
            }]
          });
          $scope.$apply();
        });
        it('should render a country selector', function() {
          expect(component.querySelector('tw-select[name=targetCountry]')).toBeTruthy();
        });

        describe('when the target country is changed', function() {
          beforeEach(function() {
            spyOn(AccountDetailsService, 'refreshRequirements')
              .and.returnValue($q.resolve(alternatives));

            var targetCountrySelect = component.querySelector('tw-select[name=targetCountry]');
            angular.element(targetCountrySelect).controller('ngModel').$setViewValue('CA');
          });
          it('should refresh the requirements with the country', function() {
            expect(AccountDetailsService.refreshRequirements).toHaveBeenCalledWith(
              'USD',
              {
                currency: 'USD',
                country: 'CA',
                type: alternatives.data[0].type
              },
              'fr-FR'
            );
          });
        });
      });

      describe('and only one target country is returned', function() {
        beforeEach(function() {
          $scope.currency = 'GBP';
          $scope.$apply();
          deferred.resolve({
            data: [{ currency: 'GBP' }]
          });
          $scope.$apply();
        });
        it('should not render a country selector', function() {
          expect(component.querySelector('twSelect[name=targetCountry]')).not.toBeTruthy();
        });
      });
    });

    describe('when a quoteId is supplied', function() {
      beforeEach(function() {
        $scope.quoteId = 123;
        $scope.$apply();
      });
      it('should request the new requirements', function() {
        expect(AccountDetailsService.getRequirementsForQuote).toHaveBeenCalledWith(
          123, 'GBP', 'fr-FR'
        );
      });
    });
  });
});
