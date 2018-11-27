describe('Given a service for interacting with the acount details API', function() {
  'use strict';

  var service,
   AccountDetailsLegacyService,
   $httpBackend;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    service = $injector.get('AccountDetailsService');
    AccountDetailsLegacyService = $injector.get('AccountDetailsLegacyService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('when requesting account requirements', function() {
    describe('with a currency', function() {
      var promise;
      beforeEach(function() {
        $httpBackend.whenGET('/account-requirements?target=GBP').respond(200, ['first']);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['second']);

        promise = service.getRequirements('GBP');
      });

      it('should make a GET call to the API', function() {
        $httpBackend.expectGET('/account-requirements?target=GBP');
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the API response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['first']);
      });
      it('should return a promise with the prepared response', function() {

        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['second']);
        });
      });
    });

    describe('without a currency', function() {
      it('should throw an error', function() {
        expect(service.getRequirements).toThrow();
      });
    });

    describe('with a quote', function() {
      var promise;
      beforeEach(function() {
        $httpBackend.whenGET('/quotes/123/account-requirements').respond(200, ['first']);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['second']);

        promise = service.getRequirementsForQuote(123, 'GBP');
      });

      it('should make a GET call to the API', function() {
        $httpBackend.expectGET('/quotes/123/account-requirements');
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the API response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['first']);
      });
      it('should return a promise with the prepared response', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['second']);
        });
      });
    });
  });

  describe('when refreshing account requirements', function() {
    describe('with a currency', function() {
      var model, formattedModel, promise;
      beforeEach(function() {
        model = {
          type: 'test',
          a: 'b'
        };
        formattedModel = {
          type: 'test',
          details: {
            a: 'b'
          }
        };

        spyOn(AccountDetailsLegacyService, 'formatModelForAPI').and.returnValue(formattedModel);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['second']);
        $httpBackend.whenPOST('/account-requirements?target=GBP').respond(200, ['first']);

        promise = service.refreshRequirements('GBP', model);
      });

      it('should use the legacy service to format the model', function() {

        $httpBackend.flush();
        expect(AccountDetailsLegacyService.formatModelForAPI).toHaveBeenCalledWith(model);
      });
      it('should POST the formatted model to the API', function() {
        $httpBackend.expectPOST('/account-requirements?target=GBP', formattedModel);
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['first']);
      });
      it('should return a promise with the prepared response', function() {

        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['second']);
        });
      });
    });

    describe('without a currency', function() {
      it('should throw an error', function() {
        expect(service.refreshRequirements).toThrow();
      });
    });
  });

  describe('when saving an account', function() {
    var model, formattedModel, promise;
    beforeEach(function() {
      model = {
        type: 'test',
        a: 'b'
      };
      formattedModel = {
        type: 'test',
        details: {
          a: 'b'
        }
      };

      spyOn(AccountDetailsLegacyService, 'formatModelForAPI').and.returnValue(formattedModel);
      spyOn(AccountDetailsLegacyService, 'formatErrorsForDisplay').and.returnValue(['formatted']);
      $httpBackend.whenPOST('/accounts').respond(function() { return [401, ['errors']]});

      promise = service.save(model);
    });

    it('should use the legacy service to format the model', function() {
      $httpBackend.flush();
      expect(AccountDetailsLegacyService.formatModelForAPI).toHaveBeenCalledWith(model);
    });
    it('should POST the formatted model to the API', function() {
      $httpBackend.expectPOST('/accounts', formattedModel);
      $httpBackend.flush();
    });
    it('should use the legacy service to format error responses', function() {
      $httpBackend.flush();
      expect(AccountDetailsLegacyService.formatErrorsForDisplay).toHaveBeenCalledWith(['errors']);
    });
    it('should return a rejected promise with the formatted errors', function() {
      $httpBackend.flush();
      promise.catch(function(errors) {
        expect(errors).toBe(['formatted']);
      });
    });

    describe('without a model', function() {
      it('should throw an error', function() {
        $httpBackend.flush();
        expect(service.save).toThrow();
      });
    });
  });

  describe('when looking up accounts by email address', function() {
    var model, formattedModel, promise;
    beforeEach(function() {
      model = {
        email: 'test@test.com'
      };

      $httpBackend.whenPOST('/api/v1/uniqueId/uniqueIdLookUp').respond(function() {
        return [200, ['accounts']]
      });

      promise = service.lookupAccountByEmail('test@test.com');
    });

    it('should POST the formatted model to the API', function() {
      $httpBackend.expectPOST('/api/v1/uniqueId/uniqueIdLookUp', {
        email: 'test@test.com',
        type: "email",
        currencyCode: "GBP"
      });
      $httpBackend.flush();
    });

    it('should return a promise with the list of matching accounts', function() {
      $httpBackend.flush();
      promise.then(function(response) {
        expect(response.data).toEqual(['accounts']);
      });
    });

    describe('without supplying an email', function() {
      it('should throw an error', function() {
        $httpBackend.flush();
        expect(service.lookupAccountByEmail).toThrow();
      });
    });
  });
});
