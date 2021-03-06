
class AccountDetailsLegacyService {
  constructor(RequirementsService, $http) {
    this.RequirementsService = RequirementsService;
    this.$http = $http;
  }

  prepareResponse(currency, alternatives) {
    // In v2 alternatives are nested inside an object
    if (alternatives.alternatives) {
      alternatives = alternatives.alternatives;
    }

    const preppedAlternatives = this.RequirementsService
      .prepRequirements(alternatives)
      .filter(alternative => Object.keys(alternative.properties).length > 0);

    const propertiesToRemove = [
      'fields', // TODO move to requirements service
      'actions',
      'dataModel',
      'image',
      'label',
      'prepared',
      'refreshUrl',
      'repeatText',
      'repeatable',
      'repeatableLabel',
      'repeatableListItemLabel',
      'reviewFields'
    ];

    preppedAlternatives.forEach((alternative) => {
      propertiesToRemove.forEach((property) => {
        delete alternative[property];
      });

      // TODO this should not be necessary, for some reason enum isn't lower case
      // It must be coming from somewhere else.
      if (alternative.typeString && alternative.properties.type) {
        alternative.properties.type.enum = [alternative.typeString];
        delete alternative.typeString;
      }

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

  /**
   * Apologies about this mess!  If we're sending USD outside of US we need to
   * check if we should use IBAN format or swift account number.  If IBAN we
   * modify the response.
   *
   * Don't you dare add another one of these! Fix your requirements API!!!
   */
  modifyUSD(country, requirementsPromise) {
    if (country && country !== 'US') {
      return requirementsPromise.then(response => checkSwiftTypeAndModifyResponse(
        response,
        this.$http,
        country
      ));
    }

    return requirementsPromise.then((response) => {
      response.data = getRequirementsByType(response.data, 'aba');
      return response;
    });
  }
}

/**
 * These props sit at the top level of a v2 model, all others are nested in the
 * details object.  This is a mapping from v1 keys to v2.
 */
const topLevelProps = {
  type: 'type',
  legalEntityType: 'legalEntityType',
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

  if (detailsProps.details && detailsProps.details.properties) {
    // In newer v2 specs it already contains the nesting for details
    newProps.details = detailsProps.details;
  } else {
    // In older v1 specs we need to add nesting for details
    newProps.details = {
      type: 'object',
      properties: detailsProps
    };
  }

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

  const newNameFields = basicNameField;

  // Some currencies have specific extensions for parts of the name form, add them.
  if (nameExtensions[currency]) {
    newNameFields.name.properties = extendProperties(
      basicNameField.name.properties,
      nameExtensions[currency]
    );
  }

  return angular.extend(newNameFields, fields);
}

function extendProperties(properties, extensions) {
  if (!extensions) {
    return properties;
  }

  const extendedProperties = {};
  Object.keys(properties).forEach((key) => {
    if (key === 'legalType') {
      // In the v2 enpoint, this needs to be mapped to legalEntityType
      extendedProperties.legalEntityType = mapLegalTypeToV2(properties[key]);
    } else {
      extendedProperties[key] = extendProperty(key, properties[key], extensions[key]);
    }
  });

  return extendedProperties;
}

function extendProperty(key, property, extensions) {
  if (!extensions) {
    return property;
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
 * Legal type has been changed in V2, the parameter name is different and the
 * enums have changed.
 */
function mapLegalTypeToV2(property) {
  delete property.control; // The control is incorrect in the API

  if (property.values) {
    property.values.forEach((valueObject) => {
      if (valueObject.value === 'PRIVATE') {
        valueObject.value = 'PERSON';
      }
      if (valueObject.value === 'BUSINESS') {
        valueObject.value = 'INSTITUTION';
      }
    });
  }

  return property;
}

/**
 * Get the format for the global USD details
 * The API returns one of:
 * { accountNumberFormat: "ACCOUNT_NUMBER" }
 * { accountNumberFormat: "IBAN" }
 * This method returns a promise with the string value
 */
function getSwiftFormat($http, country) {
  const url = `/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=${country}`;

  return $http.get(url)
    .then(response => response.data.accountNumberFormat);
}

/**
 * Load the type of swift accountfrom the API, then modify the original swift
 * requirement response accordingly
 */
function checkSwiftTypeAndModifyResponse(response, $http, country) {
  const swiftRequirements = getRequirementsByType(response.data, 'swift_code');

  return getSwiftFormat($http, country)
    .then((format) => {
      if (format === 'IBAN') {
        response.data = getIbanRequirements(swiftRequirements);
      } else {
        response.data = swiftRequirements;
      }
      return response;
    });
}

/**
 * Adapt the swift account number requirements to IBAN requirements
 */
function getIbanRequirements(swiftRequirements) {
  const properties = {};
  const details = swiftRequirements[0].properties.details.properties;

  Object.keys(details).forEach((key) => {
    if (key === 'accountNumber') {
      properties.IBAN = {
        name: 'IBAN',
        type: 'text',
        required: true,
        minLength: 2,
        placeholder: 'IBAN'
      };
    } else {
      properties[key] = details[key];
    }
  });

  swiftRequirements[0].properties.details.properties = properties;
  return swiftRequirements;
}

function getRequirementsByType(requirements, type) {
  return requirements.filter(requirement => requirement.type === type);
}

/**
 * Some countries use custom name fields, specififcations are listed below.
 */
const customNameFields = {
  ZAR: {
    name: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First name', // TODO translation
          required: true,
          // TODO translation
          helpText: 'Name must match name registered with bank'
        },
        middleName: {
          type: 'string',
          title: 'Middle name (optional)', // TODO translation
          // TODO translation
          helpText: 'Name must match name registered with bank'
        },
        lastName: {
          type: 'string',
          title: 'Last name', // TODO translation
          required: true,
          // TODO translation
          helpText: 'Name must match name registered with bank'
        }
      }
    }
  },
  RUB: {
    name: {
      type: 'object',
      properties: {
        givenName: {
          type: 'string',
          title: 'Given name', // TODO translation
          required: true,
          pattern: '^[а-яА-ЯёЁ\' -]+$',
          // TODO translation
          helpText: 'Name must be in Cyrillic'
        },
        patronymicName: {
          type: 'string',
          title: 'Patronymic name',
          pattern: '^[а-яА-ЯёЁ\' -]+$',
          required: true,
          // TODO translation
          helpText: 'Name must be in Cyrillic'
        },
        familyName: {
          type: 'string',
          title: 'Family name', // TODO translation
          required: true,
          pattern: '^[а-яА-ЯёЁ\' -]+$',
          // TODO translation
          helpText: 'Name must be in Cyrillic'
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
  address: {
    city: {
      width: 'md'
    },
    postCode: {
      width: 'md'
    }
  },
  details: {
    phoneNumber: {
      format: 'phone'
    }
  },
  legalEntityType: {
    control: 'radio'
  }
};

/**
 * These extensions will over-rule specififcations for specific currency & account
 * types.  As the API improves these should disapper.
 */
const currencyExtensions = {
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

// TODO Translations & Katakana characters
const japanNameHelp = "Enter the name exactly as it appears on the recipient's " +
  'Japanese bank account (it is usually writtin in XXXX Katakana).  A mismatch ' +
  'may cause a delay or rejection of your transfer.';

const colombiaNameHelp = "Please include all of the recipient's given and family names.";

const vietnamNameHelp = "Enter the name exactly as it appears on the recipient's " +
 'Vietnamese bank account.  A mismatch may cause a delay on your transfer';


const nameExtensions = {
  VND: {
    fullName: {
      helpText: vietnamNameHelp
    }
  },
  COP: {
    fullName: {
      helpText: colombiaNameHelp
    }
  },
  JPY: {
    fullName: {
      helpText: japanNameHelp
    }
  }
};


AccountDetailsLegacyService.$inject = ['TwRequirementsService', '$http'];

export default AccountDetailsLegacyService;
