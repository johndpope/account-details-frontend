describe('Given a service for handling legacy account details formats', function() {
  'use strict';

  var service,
   RequirementsService;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details'));

  beforeEach(inject(function($injector) {
    service = $injector.get('AccountDetailsLegacyService');
    RequirementsService = $injector.get('TwRequirementsService');
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
    var apiModel;
    beforeEach(function() {
      apiModel = service.formatModelForAPI({
        type: 'example',
        profile: 123,
        currency: 'gbp',
        accountHolderName: 'Ronald McDonald',
        prop: 'Something'
      });
    });
    it('should nest properties into a details object', function() {
      expect(apiModel).toEqual({
        type: 'example',
        profile: 123,
        currency: 'gbp',
        accountHolderName: 'Ronald McDonald',
        details: {
          prop: 'Something'
        }
      });
    });
  });

  describe('when preparing an API response for display', function() {
    var alternatives, preppedAlternatives;

    beforeEach(function() {

      alternatives = [
        {
          type: "NonEmpty",
          properties: {
            example: {
              type: "string",
              title: "Example"
            }
          }
        },
        {
          type: "Empty",
          properties: []
        },
        {
          type: "aba",
          properties: {
            abartn: {
              type: "string"
            }
          }
        }
      ];

      spyOn(RequirementsService, 'prepRequirements').and.returnValue(alternatives);

      preppedAlternatives = service.prepareResponse('USD', alternatives);
    });

    it('should use the RequirementsService to pre-format', function() {
      expect(RequirementsService.prepRequirements).toHaveBeenCalledWith(alternatives);
    });
    it('should strip out empty alternatives', function() {
      expect(preppedAlternatives.length).toEqual(2);
    });
    it('should add name field', function() {
      expect(Object.keys(preppedAlternatives[0].properties).length).toEqual(2);
    });
    it('should extend particular fields', function() {
      // This value comes from hardcoded additions in the service
      expect(preppedAlternatives[1].properties.abartn.width).toEqual('md');
    });
  });
});
