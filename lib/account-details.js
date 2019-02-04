/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _accountDetailsLegacy = __webpack_require__(2);

var _accountDetailsLegacy2 = _interopRequireDefault(_accountDetailsLegacy);

var _accountDetails = __webpack_require__(8);

var _accountDetails2 = _interopRequireDefault(_accountDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details.service', [_accountDetailsLegacy2.default]).service('AccountDetailsService', _accountDetails2.default).name;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _accountDetailsLegacy = __webpack_require__(7);

var _accountDetailsLegacy2 = _interopRequireDefault(_accountDetailsLegacy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details.legacy', []).service('AccountDetailsLegacyService', _accountDetailsLegacy2.default).name;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _accountDetailsCreate = __webpack_require__(5);

var _accountDetailsCreate2 = _interopRequireDefault(_accountDetailsCreate);

var _accountDetailsService = __webpack_require__(1);

var _accountDetailsService2 = _interopRequireDefault(_accountDetailsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details.create', [_accountDetailsService2.default, 'tw.styleguide-components']).component('accountDetailsCreate', _accountDetailsCreate2.default).name;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _multiAccountCreate = __webpack_require__(12);

var _multiAccountCreate2 = _interopRequireDefault(_multiAccountCreate);

var _accountDetailsService = __webpack_require__(1);

var _accountDetailsService2 = _interopRequireDefault(_accountDetailsService);

var _emailLookup = __webpack_require__(11);

var _emailLookup2 = _interopRequireDefault(_emailLookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details.multi-create', [_accountDetailsService2.default, _emailLookup2.default]).component('multiAccountCreate', _multiAccountCreate2.default).name;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accountDetailsCreate = __webpack_require__(6);

var _accountDetailsCreate2 = _interopRequireDefault(_accountDetailsCreate);

var _accountDetailsCreate3 = __webpack_require__(14);

var _accountDetailsCreate4 = _interopRequireDefault(_accountDetailsCreate3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountDetailsCreate = {
  controller: _accountDetailsCreate2.default,
  template: _accountDetailsCreate4.default,
  bindings: {
    currency: '<',
    quoteId: '<',
    profileId: '<',
    locale: '<',
    onChange: '<',
    onSuccess: '<',
    onFailure: '<',
    saveButtonLabel: '<'
  }
};

exports.default = AccountDetailsCreate;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountDetailsCreateController = function () {
  function AccountDetailsCreateController($scope, AccountDetailsService) {
    _classCallCheck(this, AccountDetailsCreateController);

    this.$scope = $scope;
    this.AccountDetailsService = AccountDetailsService;

    // TODO translations
    this.translations = {
      validation: {
        required: 'Field is required',
        pattern: 'Invalid format',
        minLength: 'The value is too short',
        maxLength: 'Too value is too long',
        min: 'The value is too low',
        max: 'Too value is too high'
      },
      country: {
        label: 'Which country is their account in?'
      },
      accountDetails: {
        label: 'Do you have their account details?',
        value: 'Yes, I have their details',
        info: 'No problem, we\'ll send your recipient an email asking them where\n          they want to receive the money.'
      }
    };

    this.model = {};

    this.uniqueIdRecipient = false;
    this.hasDetails = true;
  }

  _createClass(AccountDetailsCreateController, [{
    key: '$onInit',
    value: function $onInit() {
      if (!this.currency) {
        this.currency = 'GBP';
      }

      if (!this.locale) {
        this.locale = 'en-GB';
      }
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      var _this = this;

      if (changes.currency) {
        this.model.currency = changes.currency.currentValue || 'GBP';

        this.AccountDetailsService.getTargetCountries(this.model.currency).then(function (response) {
          _this.targetCountries = response.data;

          // Default to US for global USD
          // TODO find a way to do this more generically
          if (_this.model.currency === 'USD') {
            _this.model.country = 'US';
          }

          if (_this.targetCountries && _this.targetCountries.length <= 1) {
            delete _this.model.country;
          }
        }).catch(function () {
          // getTargetCountries catches errors and returns a single country
        });
      }

      if (changes.profile && changes.profile.currentValue) {
        this.model.profile = changes.profile.currentValue;
      }

      if (changes.currency || changes.quoteId || changes.locale) {
        this.loadRequirements();
      }
    }
  }, {
    key: 'loadRequirements',
    value: function loadRequirements() {
      var _this2 = this;

      var promise = void 0;
      if (this.quoteId) {
        promise = this.AccountDetailsService.getRequirementsForQuote(this.quoteId, this.model.currency, this.locale);
      } else {
        promise = this.AccountDetailsService.getRequirements(this.model.currency, this.locale, this.model.country);
      }

      promise.then(function (response) {
        // Filter out email alternative as we have custom handling
        _this2.alternatives = response.data.filter(function (alternative) {
          return !isEmailAlternative(alternative);
        });
        if (_this2.alternatives.length) {
          _this2.model.type = _this2.alternatives[0].type;
        }
      }).catch(this.handleRequirementsFailure);
    }
  }, {
    key: 'refreshRequirements',
    value: function refreshRequirements() {
      var _this3 = this;

      this.AccountDetailsService.refreshRequirements(this.model.currency, this.model, this.locale).then(function (response) {
        _this3.alternatives = response.data;
      }).catch(this.handleRequirementsFailure);
    }
  }, {
    key: 'handleRequirementsFailure',
    value: function handleRequirementsFailure(error) {//eslint-disable-line
      // TODO
    }
  }, {
    key: 'saveAccount',
    value: function saveAccount() {
      var _this4 = this;

      this.AccountDetailsService.save(this.model).then(function () {
        _this4.errors = {};
        triggerCallback(_this4.onSuccess);
      }).catch(function (errors) {
        _this4.errors = errors;
        triggerCallback(_this4.onFailure);
      });
    }
  }, {
    key: 'onEmailChange',
    value: function onEmailChange(email) {
      this.model.email = email;
      triggerCallback(this.onChange, this.model);
    }
  }, {
    key: 'onUseUniqueId',
    value: function onUseUniqueId(recipient) {
      this.uniqueIdRecipient = recipient;
    }
  }, {
    key: 'onEnterManually',
    value: function onEnterManually() {
      this.uniqueIdRecipient = false;
    }
  }, {
    key: 'onFormModelChange',
    value: function onFormModelChange(model) {
      triggerCallback(this.onChange, model);
    }
  }, {
    key: 'onCountryChange',
    value: function onCountryChange() {
      this.refreshRequirements();
      triggerCallback(this.onChange, this.model);
    }
  }, {
    key: 'isCountrySelectorVisible',
    value: function isCountrySelectorVisible() {
      return !this.uniqueIdRecipient && this.hasDetails && this.targetCountries && this.targetCountries.length > 1;
    }
  }, {
    key: 'isAccountFormVisible',
    value: function isAccountFormVisible() {
      return !this.uniqueIdRecipient && this.hasDetails;
    }
  }]);

  return AccountDetailsCreateController;
}();

function triggerCallback(callback, data) {
  if (typeof callback === 'function') {
    callback(data);
  }
}

function isEmailAlternative(alternative) {
  return alternative.properties && alternative.properties.type && alternative.properties.type.enum && alternative.properties.type.enum[0] === 'email';
}

AccountDetailsCreateController.$inject = ['$scope', 'AccountDetailsService'];

exports.default = AccountDetailsCreateController;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountDetailsLegacyService = function () {
  function AccountDetailsLegacyService(RequirementsService, $http) {
    _classCallCheck(this, AccountDetailsLegacyService);

    this.RequirementsService = RequirementsService;
    this.$http = $http;
  }

  _createClass(AccountDetailsLegacyService, [{
    key: 'prepareResponse',
    value: function prepareResponse(currency, alternatives) {
      // In v2 alternatives are nested inside an object
      if (alternatives.alternatives) {
        alternatives = alternatives.alternatives;
      }

      var preppedAlternatives = this.RequirementsService.prepRequirements(alternatives).filter(function (alternative) {
        return Object.keys(alternative.properties).length > 0;
      });

      var propertiesToRemove = ['fields', // TODO move to requirements service
      'actions', 'dataModel', 'image', 'label', 'prepared', 'refreshUrl', 'repeatText', 'repeatable', 'repeatableLabel', 'repeatableListItemLabel', 'reviewFields'];

      preppedAlternatives.forEach(function (alternative) {
        propertiesToRemove.forEach(function (property) {
          delete alternative[property];
        });

        // TODO this should not be necessary, for some reason enum isn't lower case
        // It must be coming from somewhere else.
        if (alternative.typeString && alternative.properties.type) {
          alternative.properties.type.enum = [alternative.typeString];
          delete alternative.typeString;
        }

        var typeExtensions = currencyExtensions[currency] && currencyExtensions[currency][alternative.type];

        alternative.properties = addMissingFields(alternative.properties, currency);
        alternative.properties = extendProperties(alternative.properties, typeExtensions);
        alternative.properties = extendProperties(alternative.properties, globalExtensions);
        alternative.properties = nestProperties(alternative.properties);
      });

      return preppedAlternatives;
    }

    // We now adjust the requirements rather than post-processing

  }, {
    key: 'formatModelForAPI',
    value: function formatModelForAPI(model) {
      // eslint-disable-line
      return model;
    }

    // Take flat error structure and map to model structure.

  }, {
    key: 'formatErrorsForDisplay',
    value: function formatErrorsForDisplay(errors) {
      // eslint-disable-line
      var errorMessagesObject = {};
      if (Array.isArray(errors)) {
        errors.forEach(function (error) {
          // Support 'nested.field' type paths, ONLY SUPPORTS SINGLE LEVEL OF NESTING
          if (error.path && error.path.indexOf('.') > 0) {
            // If the key contains a period we need to nest the fields in another object
            var pathSections = error.path.split('.');
            var nestedKey = pathSections[0];

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

  }, {
    key: 'modifyUSD',
    value: function modifyUSD(country, requirementsPromise) {
      var _this = this;

      if (country && country !== 'US') {
        return requirementsPromise.then(function (response) {
          return checkSwiftTypeAndModifyResponse(response, _this.$http, country);
        });
      }

      return requirementsPromise.then(function (response) {
        response.data = getRequirementsByType(response.data, 'aba');
        return response;
      });
    }
  }]);

  return AccountDetailsLegacyService;
}();

/**
 * These props sit at the top level of a v2 model, all others are nested in the
 * details object.  This is a mapping from v1 keys to v2.
 */


var topLevelProps = {
  type: 'type',
  legalEntityType: 'legalEntityType',
  profile: 'profile',
  accountHolderName: 'accountHolderName',
  currency: 'currency',
  email: 'email'
};

function nestProperties(properties) {
  var newProps = {};
  var detailsProps = {};

  Object.keys(properties).forEach(function (oldKey) {
    var newKey = topLevelProps[oldKey];

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
  var newFields = angular.extend({}, fields);
  newFields = addNameFields(newFields, currency);
  return newFields;
}

function addNameFields(fields, currency) {
  if (customNameFields[currency]) {
    return angular.extend(customNameFields[currency], fields);
  }

  // If not already there, add them
  // appeared under accountHolderName

  var basicNameField = {
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

  var newNameFields = basicNameField;

  // Some currencies have specific extensions for parts of the name form, add them.
  if (nameExtensions[currency]) {
    newNameFields.name.properties = extendProperties(basicNameField.name.properties, nameExtensions[currency]);
  }

  return angular.extend(newNameFields, fields);
}

function extendProperties(properties, extensions) {
  if (!extensions) {
    return properties;
  }

  var extendedProperties = {};
  Object.keys(properties).forEach(function (key) {
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
    property.values.forEach(function (valueObject) {
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
  var url = '/api/v1/recipient/swiftAccountNumberFormat?recipientCountry=' + country;

  return $http.get(url).then(function (response) {
    return response.data.accountNumberFormat;
  });
}

/**
 * Load the type of swift accountfrom the API, then modify the original swift
 * requirement response accordingly
 */
function checkSwiftTypeAndModifyResponse(response, $http, country) {
  var swiftRequirements = getRequirementsByType(response.data, 'swift_code');

  return getSwiftFormat($http, country).then(function (format) {
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
  var properties = {};
  var details = swiftRequirements[0].properties.details.properties;

  Object.keys(details).forEach(function (key) {
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
  return requirements.filter(function (requirement) {
    return requirement.type === type;
  });
}

/**
 * Some countries use custom name fields, specififcations are listed below.
 */
var customNameFields = {
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
        }
      }
    }
  }
};

/**
 * These extensions will extend matching property values in any recipient type.
 * As the API improves these should disapper.
 */
var globalExtensions = {
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
var currencyExtensions = {
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
var japanNameHelp = "Enter the name exactly as it appears on the recipient's " + 'Japanese bank account (it is usually writtin in XXXX Katakana).  A mismatch ' + 'may cause a delay or rejection of your transfer.';

var colombiaNameHelp = "Please include all of the recipient's given and family names.";

var vietnamNameHelp = "Enter the name exactly as it appears on the recipient's " + 'Vietnamese bank account.  A mismatch may cause a delay on your transfer';

var nameExtensions = {
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

exports.default = AccountDetailsLegacyService;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountDetailsService = function () {
  function AccountDetailsService($http, $q, AccountDetailsLegacyService) {
    _classCallCheck(this, AccountDetailsService);

    this.$http = $http;
    this.$q = $q;
    this.LegacyService = AccountDetailsLegacyService;

    this.domain = 'https://api.transferwise.com';
  }

  /**
   * Get the account requirments for a currency
   * Live calls, use source/sourceAmount for special cases
   * {{host}}/v1/account-requirements?source=EUR&target=USD&sourceAmount=1000
   */


  _createClass(AccountDetailsService, [{
    key: 'getRequirements',
    value: function getRequirements(currency, locale, country) {
      if (!currency) {
        throw new Error('Currency is required');
      }

      var options = getRequirementsHttpOptions(currency, this.LegacyService, this.$http, locale);

      var path = getRequirementsPath(currency, country);

      var promise = this.$http.get(this.domain + path, options);

      // TODO this shit is here because global USD APIs are a mess, this should be removed
      if (currency === 'USD') {
        promise = this.LegacyService.modifyUSD(country, promise);
      }

      return promise;
    }
  }, {
    key: 'getRequirementsForQuote',
    value: function getRequirementsForQuote(quoteId, currency, locale, country) {
      if (!quoteId || !currency) {
        throw new Error('Quote id and currency are required');
      }

      var options = getRequirementsHttpOptions(currency, this.LegacyService, this.$http, locale);

      var path = '/v2/quotes/' + quoteId + '/account-requirements';

      var promise = this.$http.get(this.domain + path, options);

      // TODO this shit is here because global USD APIs are a mess, this should be removed
      if (currency === 'USD') {
        promise = this.LegacyService.modifyUSD(country, promise);
      }

      return promise;
    }

    /**
     * Refresh account requirments for a currency using an existing model
     */

  }, {
    key: 'refreshRequirements',
    value: function refreshRequirements(currency, model, locale) {
      if (!currency) {
        throw new Error('Currency is required');
      }
      var apiModel = this.LegacyService.formatModelForAPI(model);

      var options = getRequirementsHttpOptions(currency, this.LegacyService, this.$http, locale);

      var path = getRequirementsPath(currency, model.country);

      var promise = this.$http.post(this.domain + path, apiModel, options);

      // TODO this shit is here because global USD APIs are a mess, this should be removed
      if (currency === 'USD') {
        promise = this.LegacyService.modifyUSD(model.country, promise);
      }

      return promise;
    }

    /**
     * Get the list of currencies for which we can create accounts
     */

  }, {
    key: 'getAccountCurrencies',
    value: function getAccountCurrencies() {
      var path = '/api/v1/currency/list';
      var options = getCurrencyListHttpOptions(this.$http);
      return this.$http.get(path, options);
    }

    /**
     * Save a new account
     */

  }, {
    key: 'save',
    value: function save(model) {
      if (!model) {
        throw new Error('Model is required');
      }
      var apiModel = this.LegacyService.formatModelForAPI(model);

      var options = getSaveHttpOptions(this.$http, this.LegacyService);

      var path = '/v2/accounts';

      return this.$http.post(path, apiModel, options);
    }

    /**
     * Do a lookup to see if we have any accounts for given email
     */

  }, {
    key: 'lookupAccountByEmail',
    value: function lookupAccountByEmail(email) {
      if (!email) {
        throw new Error('Email is required');
      }
      var type = 'email';
      var currencyCode = 'GBP';
      return this.$http.post('/api/v1/uniqueId/uniqueIdLookUp', {
        email: email, type: type, currencyCode: currencyCode
      });
    }
  }, {
    key: 'getTargetCountries',
    value: function getTargetCountries(currency) {
      if (currency === 'USD') {
        var options = {};
        var path = '/api/v1/country/listGlobalUsdCountries';
        var domain = ''; // '//transferwise.com';

        return this.$http.get(domain + path, options).then(function (response) {
          response.data = response.data.countries.map(function (country) {
            return {
              value: country.iso2Code,
              label: country.name
            };
          });
          return response;
        })
        // If the call fails return a single currency to disable global USD
        .catch(function () {
          return { data: [{ currency: 'USD' }] };
        });
      }
      return this.$q.when({ data: [{ currency: 'GBP' }] });
    }
  }]);

  return AccountDetailsService;
}();

function getRequirementsPath(currency, country) {
  var path = '/v2/account-requirements?targetCurrency=' + currency;

  if (country) {
    path += '&country=' + country;
  }
  return path;
}

/**
 * We use transformers rather than a 'then', as in Angular >1.5, using a 'then'
 * without a catch throws a warning, and we do not want to catch at this point.
 */
function getRequirementsHttpOptions(currency, LegacyService, $http, locale) {
  return {
    headers: {
      'Accept-Language': locale
    },
    transformResponse: getResponseTransformers(function (data, headers, status) {
      return handleRequirementsResponse(currency, data, status, LegacyService);
    }, $http)
  };
}

/**
 * Update successful responses to remove any legacy
 */
function handleRequirementsResponse(currency, data, status, LegacyService) {
  if (status === 200) {
    return LegacyService.prepareResponse(currency, data);
  }
  return data;
}

function getCurrencyListHttpOptions($http) {
  return {
    transformResponse: getResponseTransformers(function (data, headers, status) {
      return handleCurrencyListResponse(data, status);
    }, $http)
  };
}

function handleCurrencyListResponse(data, status) {
  if (status === 200) {
    return data.currencies.map(mapCurrencyToOption);
  }
  return data;
}

function mapCurrencyToOption(currency) {
  return {
    value: currency.code,
    label: currency.name,
    currency: currency.code,
    searchable: currency.countryKeywords ? currency.countryKeywords.reduce(function (acc, cur) {
      return acc + ', ' + cur;
    }) : ''
  };
}

/**
 * We use transformers rather than a 'then', as in Angular >1.5, using a 'then'
 * without a catch throws a warning, and we do not want to catch at this point.
 */
function getSaveHttpOptions($http, LegacyService) {
  return {
    transformResponse: getResponseTransformers(function (data, headers, status) {
      return handleSaveResponse(data, status, LegacyService);
    }, $http)
  };
}

function handleSaveResponse(data, status, LegacyService) {
  if (status === 200) {
    return data;
  }
  return LegacyService.formatErrorsForDisplay(data);
}

/**
 * Append new transform rather than replacing any already present.
 */
function getResponseTransformers(responseTransformer, $http) {
  return $http.defaults.transformResponse && $http.defaults.transformResponse.concat && $http.defaults.transformResponse.concat(responseTransformer);
}

AccountDetailsService.$inject = ['$http', '$q', 'AccountDetailsLegacyService'];

exports.default = AccountDetailsService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emailLookup = __webpack_require__(10);

var _emailLookup2 = _interopRequireDefault(_emailLookup);

var _emailLookup3 = __webpack_require__(15);

var _emailLookup4 = _interopRequireDefault(_emailLookup3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountEmailLookup = {
  controller: _emailLookup2.default,
  template: _emailLookup4.default,
  bindings: {
    locale: '<',
    onChange: '&',
    onUseUniqueId: '&',
    onEnterManually: '&'
  }
};

exports.default = AccountEmailLookup;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountEmailLookupController = function () {
  function AccountEmailLookupController(AccountDetailsService) {
    _classCallCheck(this, AccountEmailLookupController);

    this.AccountDetailsService = AccountDetailsService;
    this.requestCount = 0;
    this.lastResponse = 0;

    // TODO translations
    this.translations = {
      email: {
        label: 'Email address',
        placeholder: 'Recipient email address',
        success: 'is already on TransferWise, and would like to receive into the\n          following account.'
      },
      uniqueId: {
        label: 'How do you want to send?',
        toUniqueId: 'account ending',
        toBankDetails: 'Send to a different account'
      }
    };
  }

  _createClass(AccountEmailLookupController, [{
    key: 'onEmailChange',
    value: function onEmailChange() {
      var _this = this;

      if (this.onChange) {
        this.onChange({ email: this.email });
      }

      if (!this.email) {
        this.recipient = false;
        this.useUniqueId = false;
        return;
      }

      this.requestCount++;
      var requestCountAtCall = this.requestCount;

      this.AccountDetailsService.lookupAccountByEmail(this.email).then(function (response) {
        if (_this.lastResponse > requestCountAtCall) {
          // We already received a response from a subsequent call, so throw this away
          return;
        }
        _this.recipient = response.data.targetRecipient;
        _this.useUniqueId = true;
        _this.selectUniqueId();
      }).catch(function () {
        if (_this.lastResponse > requestCountAtCall) {
          // We already received a response from a subsequent call, so throw this away
          return;
        }
        _this.selectManual();
        _this.recipient = false;
        _this.useUniqueId = false;
      }).finally(function () {
        _this.lastResponse = Math.max(requestCountAtCall, _this.lastResponse);
      });
    }
  }, {
    key: 'selectUniqueId',
    value: function selectUniqueId() {
      if (this.onUseUniqueId) {
        this.onUseUniqueId({ recipient: this.recipient });
      }
    }
  }, {
    key: 'selectManual',
    value: function selectManual() {
      if (this.onEnterManually) {
        this.onEnterManually();
      }
    }
  }, {
    key: 'onChangeUniqueIdChoice',
    value: function onChangeUniqueIdChoice(args) {
      if (args.useUniqueId) {
        this.selectUniqueId();
      } else {
        this.selectManual();
      }
    }
  }]);

  return AccountEmailLookupController;
}();

AccountEmailLookupController.$inject = ['AccountDetailsService'];

exports.default = AccountEmailLookupController;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _emailLookup = __webpack_require__(9);

var _emailLookup2 = _interopRequireDefault(_emailLookup);

var _accountDetailsService = __webpack_require__(1);

var _accountDetailsService2 = _interopRequireDefault(_accountDetailsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details.email-lookup', [_accountDetailsService2.default]).component('accountEmailLookup', _emailLookup2.default).name;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multiAccountCreate = __webpack_require__(13);

var _multiAccountCreate2 = _interopRequireDefault(_multiAccountCreate);

var _multiAccountCreate3 = __webpack_require__(16);

var _multiAccountCreate4 = _interopRequireDefault(_multiAccountCreate3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiAccountCreate = {
  controller: _multiAccountCreate2.default,
  template: _multiAccountCreate4.default,
  bindings: {
    profileId: '<',
    currency: '<',
    locale: '<',
    onChange: '<',
    onSuccess: '<',
    onFailure: '<',
    saveButtonLabel: '<'
  }
};

exports.default = MultiAccountCreate;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bindings = void 0;

var MultiAccountCreateController = function () {
  function MultiAccountCreateController(AccountDetailsService) {
    _classCallCheck(this, MultiAccountCreateController);

    this.AccountDetailsService = AccountDetailsService;

    // TODO translations
    this.translations = {
      currency: {
        label: 'Currency',
        placeholder: 'Choose currency'
      }
    };

    bindings = this;
  }

  _createClass(MultiAccountCreateController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      if (!this.currency) {
        this.currency = 'USD';
      }
      if (!this.locale) {
        this.locale = 'en-GB';
      }

      this.currencies = [];
      // this.email = '';

      this.AccountDetailsService.getAccountCurrencies().then(function (response) {
        _this.currencies = response.data;
      }).catch(function () {
        // TODO
      });
    }

    // Inthese callback handlers it looks like we should be able to use 'this',
    // instead of creating the bindings variable, yet when this executes 'this'
    // is actually pointing to the child 'AccountDetailsCreateController'.
    // I think webpack must convert this to an arrow function and pass by reference
    // losing the parent scope.

  }, {
    key: 'onSaveSuccess',
    value: function onSaveSuccess() {
      // eslint-disable-line
      triggerCallback(bindings.onSuccess);
    }
  }, {
    key: 'onSaveFailure',
    value: function onSaveFailure() {
      // eslint-disable-line
      triggerCallback(bindings.onFailure);
    }
  }, {
    key: 'onDetailsModelChange',
    value: function onDetailsModelChange(model) {
      // eslint-disable-line
      triggerCallback(bindings.onChange, model);
    }
  }]);

  return MultiAccountCreateController;
}();

function triggerCallback(callback, data) {
  if (typeof callback === 'function') {
    callback(data);
  }
}

MultiAccountCreateController.$inject = ['AccountDetailsService'];

exports.default = MultiAccountCreateController;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"form-group\">\n  <label class=\"control-label\">\n    {{ $ctrl.translations.accountDetails.label }}\n  </label>\n  <div class=\"checkbox\" ng-class=\"{ 'has-info': !$ctrl.hasDetails }\">\n    <label>\n      <tw-checkbox\n        ng-init=\"$ctrl.hasDetails = true;\"\n        ng-model=\"$ctrl.hasDetails\"\n        ng-true-value=\"true\"\n        ng-false-value=\"false\" checked></tw-checkbox>\n      {{ $ctrl.translations.accountDetails.value }}\n    </label>\n    <div class=\"alert alert-info\" ng-if=\"!$ctrl.hasDetails\">\n      {{ $ctrl.translations.accountDetails.info }}\n    </div>\n  </div>\n</div>\n\n<account-email-lookup\n  locale=\"$ctrl.locale\"\n  on-change=\"$ctrl.onEmailChange(email)\"\n  on-use-unique-id=\"$ctrl.onUseUniqueId(recipient)\"\n  on-enter-manually=\"$ctrl.onEnterManually()\"\n></account-email-lookup>\n\n<div class=\"form-group\"\n  ng-if=\"$ctrl.isCountrySelectorVisible()\">\n  <label class=\"control-label\">\n    {{ $ctrl.translations.country.label }}\n  </label>\n  <tw-select\n    ng-model=\"$ctrl.model.country\"\n    options=\"$ctrl.targetCountries\"\n    ng-change=\"$ctrl.onCountryChange()\"\n    name=\"targetCountry\"\n  ></tw-select>\n</div>\n\n<form\n  ng-if=\"$ctrl.isAccountFormVisible()\"\n  name=\"accountCreateForm\"\n  novalidate\n  ng-submit=\"accountCreateForm.$valid && $ctrl.saveAccount()\"\n  ng-class=\"{'m-t-panel': $ctrl.alternatives.length > 1}\">\n\n  <tw-requirements-form\n    ng-if=\"$ctrl.alternatives\"\n    model=\"$ctrl.model\"\n    on-model-change=\"$ctrl.onFormModelChange(model)\"\n    requirements=\"$ctrl.alternatives\"\n    error-messages=\"$ctrl.errors\"\n    validation-messages=\"$ctrl.translations.validation\"\n    on-refresh-requirements=\"$ctrl.refreshRequirements()\">\n  </tw-requirements-form >\n  <input type=\"submit\"\n    value=\"{{ $ctrl.saveButtonLabel }}\"\n    class=\"btn btn-block btn-primary\" />\n</form>\n";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\"\n  ng-class=\"{ 'has-success': $ctrl.recipient }\">\n  <label class=\"control-label\">\n    {{ $ctrl.translations.email.label }}\n  </label>\n  <input\n    name=\"email\"\n    class=\"form-control\"\n    placeholder=\"{{ $ctrl.translations.email.placeholder }}\"\n    ng-model=\"$ctrl.email\"\n    ng-model-options=\"{ debounce: 500 }\"\n    ng-change=\"$ctrl.onEmailChange()\" />\n  <div class=\"alert alert-success\" ng-if=\"$ctrl.recipient\">\n    {{ $ctrl.recipient.name }} {{ $ctrl.translations.email.success }}\n  </div>\n</div>\n<div class=\"form-group\"\n  ng-if=\"$ctrl.recipient\">\n  <label class=\"control-label\">\n    {{ $ctrl.translations.uniqueId.label }}\n  </label>\n  <div class=\"radio radio-lg\">\n    <label>\n      <tw-radio\n        name=\"uniqueId\"\n        ng-value=\"true\"\n        ng-model=\"$ctrl.useUniqueId\"\n        ng-change=\"$ctrl.onChangeUniqueIdChoice({ useUniqueId: true })\"></tw-radio>\n      {{ $ctrl.recipient.name }}\n      <small>\n        {{ $ctrl.recipient.currency }} {{ $ctrl.translations.uniqueId.toUniqueId }}\n        {{ $ctrl.recipient.shortAccountString.slice(-4) }}\n      </small>\n    </label>\n  </div>\n  <div class=\"radio\">\n    <label>\n      <tw-radio\n        name=\"uniqueId\"\n        ng-value=\"false\"\n        ng-model=\"$ctrl.useUniqueId\"\n        ng-change=\"$ctrl.onChangeUniqueIdChoice({ useUniqueId: false })\"></tw-radio>\n      {{ $ctrl.translations.uniqueId.toBankDetails }}\n    </label>\n  </div>\n</div>\n";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"form-group\">\n  <label class=\"control-label\">{{ $ctrl.translations.currency.label }}</label>\n  <tw-select\n    ng-model=\"$ctrl.currency\"\n    options=\"$ctrl.currencies\"\n    placeholder=\"{{ $ctrl.translations.currency.placeholder }}\"\n  ></tw-select>\n</div>\n\n<account-details-create\n  profile-id=\"$ctrl.profileId\"\n  currency=\"$ctrl.currency\"\n  locale=\"$ctrl.locale\"\n  email=\"$ctrl.email\"\n  on-change=\"$ctrl.onDetailsModelChange\"\n  on-success=\"$ctrl.onSaveSuccess\"\n  on-failure=\"$ctrl.onSaveFailure\"\n  save-button-label=\"$ctrl.saveButtonLabel\">\n</account-details-create>\n";

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _accountDetailsLegacy = __webpack_require__(2);

var _accountDetailsLegacy2 = _interopRequireDefault(_accountDetailsLegacy);

var _accountDetailsService = __webpack_require__(1);

var _accountDetailsService2 = _interopRequireDefault(_accountDetailsService);

var _accountDetailsCreate = __webpack_require__(3);

var _accountDetailsCreate2 = _interopRequireDefault(_accountDetailsCreate);

var _multiAccountCreate = __webpack_require__(4);

var _multiAccountCreate2 = _interopRequireDefault(_multiAccountCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.account-details', [_accountDetailsLegacy2.default, _accountDetailsService2.default, _accountDetailsCreate2.default, _multiAccountCreate2.default]).name;

/***/ })
/******/ ]);