
class AccountDetailsLegacyService {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  prepareResponse(currency, alternatives) {
    const preppedAlternatives = this.RequirementsService
      .prepRequirements(alternatives)
      .filter(alternative => Object.keys(alternative.properties).length > 0);

    preppedAlternatives.forEach((alternative) => {
      const extensions = currencyExtensions[currency]
        && currencyExtensions[currency][alternative.type];

      alternative.properties = addMissingFields(alternative.properties, currency);
      alternative.properties = extendProperties(alternative.properties, extensions);
    });

    return preppedAlternatives;
  }

  // Take flat structure and nest details for the API
  formatModelForAPI(model) { // eslint-disable-line
    const apiModel = {
      type: model.type,
      profile: model.profile,
      currency: model.currency,
      accountHolderName: model.accountHolderName,
      details: angular.extend({}, model)
    };
    delete apiModel.details.type;
    delete apiModel.details.profile;
    delete apiModel.details.accountHolderName;
    delete apiModel.details.currency;
    return apiModel;
  }

  // Take flat error structure and map to model structure.
  formatErrorsForDisplay(errors) { // eslint-disable-line
    const errorMessagesObject = {};
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        // Support 'nested.field' type paths, ONLY SUPPORTS SINGLE LEVEL OF NESTING
        if (error.path && error.path.indexOf('.') > 0) {
          // If the key contains a period we need to nest the fields in another object
          const pathSections = error.path.split('.');
          const nestedKey = pathSections[0];

          // If this sub object doesn't exist yet, create it
          if (!errorMessagesObject[nestedKey]) {
            errorMessagesObject[nestedKey] = {};
          }
          errorMessagesObject[nestedKey][pathSections[1]] = error.message;
        } else {
          errorMessagesObject[error.path] = error.message;
        }
      });
    }
    return errorMessagesObject;
  }
}


function addMissingFields(fields, currency) {
  let newFields = angular.extend({}, fields);
  newFields = addNameFields(newFields, currency);
  return newFields;
}

function addNameFields(fields, currency) {
  if (customNameFields[currency]) {
    return angular.extend(customNameFields[currency], fields);
  }

  // If not already there, add them
  const basicNameField = {
    accountHolderName: {
      type: 'string',
      title: 'Name',
      placeholder: 'Enter name...'
    }
  };

  return angular.extend(basicNameField, fields);
}

function extendProperties(properties, extensions) {
  if (!extensions) {
    return properties;
  }

  const extendedProperties = {};
  Object.keys(properties).forEach((key) => {
    extendedProperties[key] = extendProperty(key, properties[key], extensions[key]);
  });

  return extendedProperties;
}

function extendProperty(key, property, extensions) {
  if (!extensions) {
    return property;
  }

  if (key === 'legalType') {
    delete property.control;
  }
  if (key === 'address') {
    property.title = 'Address details';
  }

  if (property.type === 'object') {
    // If we're dealing with a nested object, we must extend recursively
    property.properties = extendProperties(property.properties, extensions);
    return property;
  }

  // Extend existing field
  return angular.extend(property, extensions);
}

/**
 * Some countries use custom name fields, specififcations are listed below.
 */
const customNameFields = {
  ZAR: {
    // TODO this isn't the correct name config for ZAR
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },
  RUB: {
    // TODO this isn't the correct name config for RUB
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  }
};

/* These extensions will over-rule, or add to the specififcations we get from
 * the API.  As the API improves these should disapper.
*/
const currencyExtensions = {
  VND: {
    vietname_earthport: {
      accountHolderName: {
        helpText: 'Something about exactly as it appears...'
      }
    }
  },
  JPY: {
    japanese: {
      accountHolderName: {
        helpText: 'Exactly as it appears...'
      }
    }
  },
  COP: {
    COLOMBIA: {
      accountHolderName: {
        helpText: 'Something about middle names'
      }
    }
  },
  USD: {
    aba: {
      abartn: {
        width: 'md'
      },
      accountNumber: {
        width: 'md'
      },
      address: {
        city: {
          width: 'md'
        },
        postCode: {
          width: 'md'
        }
      }
    }
  }
};

AccountDetailsLegacyService.$inject = ['TwRequirementsService'];

export default AccountDetailsLegacyService;
