describe('Given a service for handling legacy account details formats', function() {
  'use strict';

  var service,
   RequirementsService,
   $httpBackend,
   $q;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    service = $injector.get('AccountDetailsLegacyService');
    RequirementsService = $injector.get('TwRequirementsService');
    $httpBackend = $injector.get('$httpBackend');
    $q = $injector.get('$q');
  }));

  describe('when formatting an error model', function() {
    var errors
    beforeEach(function() {
      errors = service.formatErrorsForDisplay([
        {
          code: 'NOT_VALID',
          message: 'Incorrect value',
          path: 'sortCode'
        },
        {
          code: 'REQUIRED',
          message: 'Required',
          path: 'name'
        },
        {
          code: 'REQUIRED',
          message: 'Too short',
          path: 'address.city'
        }
      ]);
    });
    it('should convert array to an object', function() {
      expect(errors).toEqual({
        sortCode: 'Incorrect value',
        name: 'Required',
        address: {
          city: 'Too short'
        }
      });
    });
  });

  describe('when formatting an account model', function() {
    var apiModel, originalModel;
    beforeEach(function() {
      originalModel = {
        type: 'example',
        legalType: 'PERSONAL',
        profile: 123,
        currency: 'gbp',
        accountHolderName: 'Ronald McDonald',
        prop: 'Something',
        address: {
          city: 'London',
          country: 'UK'
        }
      };

      apiModel = service.formatModelForAPI(originalModel);
    });
    it('should not change the object', function() {
      expect(apiModel).toEqual(originalModel);
    });
  });

  describe('when preparing alternatives response', function() {
    var alternatives, preppedAlternatives;

    beforeEach(function() {
      alternatives = [{
        type: 'NonEmpty',
        properties: {
          example: {
            type: 'string',
            title: 'Example'
          }
        }
      },{
        type: 'Empty',
        properties: {}
      }];

      spyOn(RequirementsService, 'prepRequirements').and.returnValue(alternatives);
      preppedAlternatives = service.prepareResponse('USD', alternatives);
    });

    it('should use the RequirementsService to pre-format', function() {
      expect(RequirementsService.prepRequirements).toHaveBeenCalledWith(alternatives);
    });
    it('should strip out empty alternatives', function() {
      expect(preppedAlternatives.length).toEqual(1);
    });
    it('should add name property as a nested object', function() {
      expect(preppedAlternatives[0].properties.name).toEqual({
        type: 'object',
        properties: {
          fullName: {
            type: 'string',
            title: 'Name', // TODO translation
            placeholder: 'Enter name...' // TODO translation
          }
        }
      });
    });
  });

  describe('when preparing an aba alternative', function() {
    var alternativeExpectingExtension, preppedAlternative;

    beforeEach(function() {
      alternativeExpectingExtension = {
        type: 'aba',
        properties: {
          abartn: {
            type: 'string'
          }
        }
      };

      spyOn(RequirementsService, 'prepRequirements').and.returnValue([alternativeExpectingExtension]);
      preppedAlternative = service.prepareResponse('USD', [alternativeExpectingExtension])[0];
    });

    it('should add a with to the abartn property', function() {
      // This value comes from hardcoded additions in the service
      expect(preppedAlternative.properties.details.properties.abartn.width).toEqual('md');
    });
  });

  describe('when preparing a complex alternatives response', function() {
    var complex, prepped;

    beforeEach(function() {
      complex = {
        type: 'complex',
        properties: {
          legalType: {
            type: 'string',
            values: [{
              value: 'PRIVATE',
              label: 'Person'
            },{
              value: 'BUSINESS',
              label: 'Business'
            }]
          },
          unrecognised: {
            type: 'number'
          },
          address: {
            type: 'object',
            properties: {
              city: {
                type: 'string'
              }
            }
          },
          profile: { type: 'number' }
        }
      };

      spyOn(RequirementsService, 'prepRequirements').and.returnValue([complex]);
      prepped = service.prepareResponse('USD', [complex])[0];
    });

    it('should map legalType to legalEntityType', function() {
      expect(prepped.properties.legalEntityType).toBeTruthy();
    });

    it('should change legalEntityType enums to PERSON & INSTITUTION', function() {
      expect(prepped.properties.legalEntityType).toEqual({
        type: 'string',
        values: [{
          value: 'PERSON',
          label: 'Person'
        },{
          value: 'INSTITUTION',
          label: 'Business'
        }]
      });
    });

    it('should nest unrecognised fields in a details object', function() {
      expect(prepped.properties.details).toEqual({
        type: 'object',
        properties: {
          unrecognised: {
            type: 'number'
          }
        }
      });
    });

    it('should keep address at the top level', function() {
      expect(prepped.properties.address).toEqual(
        complex.properties.address
      );
    });
    it('should keep currency at the top level', function() {
      expect(prepped.properties.currency).toEqual(
        complex.properties.currency
      );
    });
  });

  describe('when modifying a USD promise', function() {
    var modified, usdRequirements, promise;

    beforeEach(function() {
      usdRequirements = getUsdRequirements();
      promise = $q.when({data: usdRequirements });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('if the country is US', function() {
      beforeEach(function() {
        modified = service.modifyUSD('US', promise);
      });

      it('should return a promise with the US details', function() {
        modified.then(function(response) {
          var requirements = response.data;

          expect(requirements.length).toBe(1);
          expect(requirements[0].type).toBe("aba");

          var detailsProperties = requirements[0].properties.details.properties;

          expect(detailsProperties.abartn).toBeTruthy();
          expect(detailsProperties.iban).toBeFalsy();
          expect(detailsProperties.accountNumber).toBeFalsy();
        });
      });
    });

    describe('if no country is supplied ', function() {
      beforeEach(function() {
        modified = service.modifyUSD(null, promise);
      });

      it('should return a promise with the US details', function() {
        modified.then(function(response) {
          var requirements = response.data;

          expect(requirements.length).toBe(1);
          expect(requirements[0].type).toBe("aba");

          var detailsProperties = requirements[0].properties.details.properties;

          expect(detailsProperties.abartn).toBeTruthy();
          expect(detailsProperties.iban).toBeFalsy();
          expect(detailsProperties.accountNumber).toBeFalsy();
        });
      });
    });

    describe('if a non US country is supplied ', function() {
      beforeEach(function() {
        var path = '/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=';
        $httpBackend.whenGET(path + 'GB').respond({ accountNumberFormat: "ACCOUNT_NUMBER" });
        $httpBackend.whenGET(path + 'HK').respond({ accountNumberFormat: "IBAN" });
      });

      describe('when that country uses account numbers', function() {
        beforeEach(function() {
          modified = service.modifyUSD('GB', promise);
        });

        it('should request the accout format for that country', function() {
          $httpBackend.expectGET('/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=GB');
          $httpBackend.flush();
        });

        it('should return a promise with the Swift account number details', function() {
          $httpBackend.flush();

          modified.then(function(response) {
            var requirements = response.data;

            expect(requirements.length).toBe(1);
            expect(requirements[0].type).toBe("swift_code");

            var detailsProperties = requirements[0].properties.details.properties;

            expect(detailsProperties.iban).toBeFalsy();
            expect(detailsProperties.accountNumber).toBeTruthy();
          });
        });
      });

      describe('when that country uses IBANs', function() {
        beforeEach(function() {
          modified = service.modifyUSD('HK', promise);
        });

        it('should request the accout format for that country', function() {
          $httpBackend.expectGET('/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=HK');
          $httpBackend.flush();
        });

        it('should return a promise with the Swift IBAN details', function() {
          $httpBackend.flush();

          modified.then(function(response) {
            var requirements = response.data;

            expect(requirements.length).toBe(1);
            expect(requirements[0].type).toBe("swift_code");

            var detailsProperties = requirements[0].properties.details.properties;

            expect(detailsProperties.IBAN).toBeTruthy();
            expect(detailsProperties.accountNumber).toBeFalsy();
          });
        });
      });
    });
  });

  // TODO global extensions
  // TODO name structure
});

function getUsdRequirements() {
  return [{
    type: "aba",
    properties: {
      details: {
        properties: {
          abartn: {}
        }
      }
    }
  },{
    type: "swift_code",
    properties: {
      details: {
        properties: {
          accountNumber: {}
        }
      }
    }
  }]
}
