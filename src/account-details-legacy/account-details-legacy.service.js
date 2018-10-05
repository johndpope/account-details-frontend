
class AccountDetailsLegacyService {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  prepareResponse(currency, alternatives) {
    const preppedAlternatives = this.RequirementsService
      .prepRequirements(alternatives)
      .filter(alternative => Object.keys(alternative.properties).length > 0);

    preppedAlternatives.forEach((alternative) => {
      alternative.properties = addMissingFields(alternative.properties, currency);
      extendAlternative(alternative, currency);
      updateFields(alternative.properties);
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
    if (errors && errors.forEach) {
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

function updateFields(fields) {
  Object.keys(fields).forEach((key) => {
    if (key === 'legalType') {
      delete fields[key].control;
    }
    if (key === 'address') {
      fields[key].title = 'Address details';
    }
  });
}

// TODO less side effecty
function extendAlternative(alternative, currency) {
  if (currencyExtensions[currency] &&
      currencyExtensions[currency][alternative.type]) {
    const extensions = currencyExtensions[currency][alternative.type];
    alternative.properties = extendFields(alternative.properties, extensions);
  }
}

function extendFields(fields, extensions) {
  const extendedFields = angular.extend({}, fields);
  Object.keys(extensions).forEach((key) => {
    if (extendedFields[key]) {
      if (extendedFields[key].type !== 'object') {
        // Extend existing field
        angular.extend(extendedFields[key], extensions[key]);
      } else {
        // If we're dealing with a nested object, we must extend recursively
        extendedFields[key].properties = extendFields(
          extendedFields[key].properties,
          extensions[key]
        );
      }
    } else {
      // Add new field
      extendedFields[key] = extensions[key];
    }
  });
  return extendedFields;
}

/**
 * Some countries use custom name fields, specififcations are listed below.
 */
const customNameFields = {
  ZAR: {
    // TODO this isn't right
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },
  RUB: {
    // TODO this isn't right
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
