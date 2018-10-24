
class AccountDetailsLegacyService {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  prepareResponse(currency, alternatives) {
    const preppedAlternatives = this.RequirementsService
      .prepRequirements(alternatives)
      .filter(alternative => Object.keys(alternative.properties).length > 0);

    preppedAlternatives.forEach((alternative) => {
      const typeExtensions = currencyExtensions[currency]
        && currencyExtensions[currency][alternative.type];

      alternative.properties = addMissingFields(alternative.properties, currency);
      alternative.properties = extendProperties(alternative.properties, typeExtensions);
      alternative.properties = extendProperties(alternative.properties, globalExtensions);
      alternative.properties = nestProperties(alternative.properties);
    });

    return preppedAlternatives;
  }

  // We now adjust the requirements rather than post-processing
  formatModelForAPI(model) { // eslint-disable-line
    return model;
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

/**
 * These props sit at the top level of a v2 model, all others are nested in the
 * details object.  This is a mapping from v1 keys to v2.
 */
const topLevelProps = {
  type: 'type',
  legalType: 'legalEntityType',
  profile: 'profile',
  accountHolderName: 'accountHolderName',
  currency: 'currency',
  email: 'email'
};

function nestProperties(properties) {
  const newProps = {};
  const detailsProps = {};

  Object.keys(properties).forEach((oldKey) => {
    const newKey = topLevelProps[oldKey];

    // Hold back address until the end to preserve ordering
    if (oldKey === 'address') {
      return;
    }
    if (oldKey === 'name') {
      return;
    }

    if (newKey) {
      newProps[newKey] = properties[oldKey];
    } else {
      detailsProps[oldKey] = properties[oldKey];
    }
  });

  if (properties.name) {
    newProps.name = properties.name;
  }

  newProps.details = {
    type: 'object',
    properties: detailsProps
  };

  if (properties.address) {
    newProps.address = properties.address;
  }

  return newProps;
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
  // appeared under accountHolderName

  const basicNameField = {
    name: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string',
          title: 'Name', // TODO translation
          placeholder: 'Enter name...' // TODO translation
        }
      }
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
    // If using v2 enpoint, this needs to be mapped to legalEntityType
    // The allowed values are also different
    delete property.control;
  }
  if (key === 'address') {
    property.title = 'Address details'; // TODO translation
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
    name: {
      type: 'object',
      properties: {
        givenName: {
          type: 'string',
          title: 'Given name', // TODO translation
          required: true
        },
        patronymicName: {
          type: 'string',
          title: 'Patronymic name',
          pattern: '^[а-яА-ЯёЁ\' -]+$',
          required: true,
          helpText: 'Cyrillic characters only' // TODO translation
        },
        familyName: {
          type: 'string',
          title: 'Family name', // TODO translation
          required: true
        },
      }
    },
  }
};

/**
 * These extensions will extend matching property values in any recipient type.
 * As the API improves these should disapper.
 */
const globalExtensions = {
  legalType: {
    values: [{
      value: 'PERSON',
      label: 'Person'
    }, {
      value: 'INSTITUTION',
      label: 'Business'
    }]
  },
  address: {
    city: {
      width: 'md'
    },
    postCode: {
      width: 'md'
    }
  }
};

/**
 * These extensions will over-rule specififcations for specific currency & account
 * types.  As the API improves these should disapper.
 */
const currencyExtensions = {
  VND: {
    vietname_earthport: {
      accountHolderName: {
        helpText: 'Something about exactly as it appears...' // TODO translation
      }
    }
  },
  JPY: {
    japanese: {
      accountHolderName: {
        helpText: 'Exactly as it appears...' // TODO translation
      }
    }
  },
  COP: {
    COLOMBIA: {
      accountHolderName: {
        helpText: 'Something about middle names' // TODO translation
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
      }
    }
  },
  GBP: {
    sort_code: {
      sortCode: {
        width: 'md'
      },
      accountNumber: {
        width: 'md'
      }
    }
  }
};

AccountDetailsLegacyService.$inject = ['TwRequirementsService'];

export default AccountDetailsLegacyService;
