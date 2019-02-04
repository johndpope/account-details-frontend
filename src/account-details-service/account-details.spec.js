describe('Given a service for interacting with the acount details API', function() {
  'use strict';

  var service,
   AccountDetailsLegacyService,
   $httpBackend,
   $q;

  var restGwRequirements = 'https://api.transferwise.com/v2/account-requirements';
  var restGwQuoteRequirements = 'https://api.transferwise.com/v2/quotes/123/account-requirements';

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    service = $injector.get('AccountDetailsService');
    AccountDetailsLegacyService = $injector.get('AccountDetailsLegacyService');
    $httpBackend = $injector.get('$httpBackend');
    $q = $injector.get('$q');;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('when requesting account requirements', function() {
    describe('with a currency', function() {
      var promise;
      beforeEach(function() {
        $httpBackend.whenGET(restGwRequirements + '?targetCurrency=GBP').respond(200, ['original']);
        $httpBackend.whenGET(restGwRequirements+ '?targetCurrency=GBP&country=GB').respond(200, ['original']);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['prepared']);

        promise = service.getRequirements('GBP');
      });

      it('should make a GET call to the API', function() {
        $httpBackend.expectGET(restGwRequirements + '?targetCurrency=GBP');
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the API response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['original']);
      });
      it('should return a promise with the prepared response', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['prepared']);
        });
      });
    });

    describe('without a currency', function() {
      it('should throw an error', function() {
        expect(service.getRequirements).toThrow();
      });
    });

    describe('for USD', function() {
      var promise;
      beforeEach(function() {
        $httpBackend.whenGET(restGwRequirements + '?targetCurrency=USD').respond(200, ['original']);

        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['prepared']);
        spyOn(AccountDetailsLegacyService, 'modifyUSD').and.returnValue($q.resolve(['modified']));
        promise = service.getRequirements('USD');
      })
      it('should use the legacy service to prepare the original response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('USD', ['original']);
      });
      it('should use the legacy service to modify the prepared response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.modifyUSD).toHaveBeenCalled();
      });
      it('should return a promise with the prepared & modified response', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response).toEqual(['modified']);
        });
      });
    });

    describe('with a currency and a country', function() {
      beforeEach(function() {
        $httpBackend.whenGET(restGwRequirements + '?targetCurrency=USD&country=HK').respond(200, ['original']);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['prepared']);
        spyOn(AccountDetailsLegacyService, 'modifyUSD').and.returnValue($q.resolve(['modified']));

        service.getRequirements('USD', 'fr-FR', 'HK');
      });
      it('should pass the country to the API', function() {
        $httpBackend.expectGET(restGwRequirements + '?targetCurrency=USD&country=HK');
        $httpBackend.flush();
      });
    });

    describe('with a quote', function() {
      var promise;
      beforeEach(function() {
        $httpBackend.whenGET(restGwQuoteRequirements).respond(200, ['original']);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['prepared']);

        promise = service.getRequirementsForQuote(123, 'GBP');
      });

      it('should make a GET call to the API', function() {
        $httpBackend.expectGET(restGwQuoteRequirements);
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the API response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['original']);
      });
      it('should return a promise with the prepared response', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['prepared']);
        });
      });
    });
  });

  describe('when refreshing account requirements', function() {
    var model, formattedModel;

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
    });

    describe('with a currency', function() {
      var promise;
      beforeEach(function() {
        spyOn(AccountDetailsLegacyService, 'formatModelForAPI').and.returnValue(formattedModel);
        spyOn(AccountDetailsLegacyService, 'prepareResponse').and.returnValue(['prepared']);
        $httpBackend.whenPOST(restGwRequirements + '?targetCurrency=GBP').respond(200, ['original']);

        promise = service.refreshRequirements('GBP', model);
      });

      it('should use the legacy service to format the model', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.formatModelForAPI).toHaveBeenCalledWith(model);
      });
      it('should POST the formatted model to the API', function() {
        $httpBackend.expectPOST(restGwRequirements + '?targetCurrency=GBP', formattedModel);
        $httpBackend.flush();
      });
      it('should use the legacy service to prepare the response', function() {
        $httpBackend.flush();
        expect(AccountDetailsLegacyService.prepareResponse).toHaveBeenCalledWith('GBP', ['original']);
      });
      it('should return a promise with the prepared response', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual(['prepared']);
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
      $httpBackend.whenPOST('/v2/accounts').respond(401, ['errors']);

      promise = service.save(model);
    });

    it('should use the legacy service to format the model', function() {
      promise.catch(function() {});
      $httpBackend.flush();
      expect(AccountDetailsLegacyService.formatModelForAPI).toHaveBeenCalledWith(model);
    });
    it('should POST the formatted model to the API', function() {
      promise.catch(function() {});
      $httpBackend.expectPOST('/v2/accounts', formattedModel);
      $httpBackend.flush();
    });
    it('should use the legacy service to format error responses', function() {
      promise.catch(function() {});
      $httpBackend.flush();
      expect(AccountDetailsLegacyService.formatErrorsForDisplay).toHaveBeenCalledWith(['errors']);
    });
    it('should return a rejected promise with the formatted errors', function() {

      promise
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(errors) {
          expect(errors.data).toEqual(['formatted']);
        });
      $httpBackend.flush();
    });

    describe('without a model', function() {
      it('should throw an error', function() {
        promise.catch(function() {});
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
        type: 'email',
        currencyCode: 'GBP'
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


  describe('when requesting the list of available target countries', function() {
    var promise;
    beforeEach(function() {
      var globalUsdCountries = {
        total: 2,
        countries: [{
          name: 'Albania',
          iso2Code: 'AL',
          iso3Code: 'alb',
          callingCode: 355
        }, {
          name: 'Algeria',
          iso2Code: 'DZ',
          iso3Code: 'dza',
          callingCode: 213
        }]
      };

      $httpBackend.whenGET('/api/v1/country/listGlobalUsdCountries').respond(
        200,
        globalUsdCountries
      );
    });

    describe('if currency is USD', function() {
      beforeEach(function() {
        promise = service.getTargetCountries('USD');
      });

      it('should request them from the usd endpoint', function() {
        $httpBackend.expectGET('/api/v1/country/listGlobalUsdCountries');
        $httpBackend.flush();
      });
      it('should return a promise with the data from the API formatted', function() {
        $httpBackend.flush();
        promise.then(function(response) {
          expect(response.data).toEqual([{
            value: 'AL',
            label: 'Albania'
          },{
            value: 'DZ',
            label: 'Algeria'
          }]);
        });
      });
    });

    describe('if currency is not USD', function() {
      var model, formattedModel, promise;
      beforeEach(function() {
        promise = service.getTargetCountries('GBP');
      });

      it('should not request them from the usd endpoint', function() {
        // Should be nothing to flush, so will throw an error
        expect($httpBackend.flush).toThrow();
      });
      it('should return a promise with just the requested country', function() {
        promise.then(function(response) {
          expect(response.data).toEqual([{currency: 'GBP'}]);
        });
      });
    });
  });
});
