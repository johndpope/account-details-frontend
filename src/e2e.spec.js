describe('given a system for creating account details, when initialised', function() {
  var $scope, component, $compile, template, $httpBackend;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.account-details.create'));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();

    template = " \
      <account-details-create \
        currency='GBP' \
        profile-id='1234' \
      ></account-details-create>";

    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('/account-requirements?target=GBP').respond(requirements);

    $httpBackend.whenPOST('/accounts').respond(function(method, url, data) {
      return [200, data];
    });
  }));

  describe('when initialised', function() {
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should render the control from the requirements', function() {
      component = getComponent($compile, $scope, template);
      $httpBackend.flush();
      var accountInput = component.querySelector('input[name=accountNumber]');
      expect(accountInput).toBeTruthy();
    });

    it('should call the API to get the account requirements', function() {
      $httpBackend.expectGET('/account-requirements?target=GBP');
      component = getComponent($compile, $scope, template);
      $httpBackend.flush();
    });
  });

  describe('when a new account is saved', function() {
    beforeEach(function() {
      component = getComponent($compile, $scope, template);
      $httpBackend.flush();

      var nameInput = component.querySelector('input[name=fullName]');
      var accountInput = component.querySelector('input[name=accountNumber]');

      nameInput.value = 'Steve';
      nameInput.dispatchEvent(new Event('input'));

      accountInput.value = '12345678';
      accountInput.dispatchEvent(new Event('input'));
    });

    it('should call the API to save the account', function() {
      $httpBackend.expectPOST('/accounts', {
        currency: 'GBP',
        type: 'test',
        name: {
          fullName: 'Steve'
        },
        details: {
          accountNumber: '12345678'
        }
      });

      // We need to trigger the save after we set up the expectation
      var submit = component.querySelector('input[type=submit]');
      submit.dispatchEvent(new Event('click'));

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});

var requirements = [{
  type: 'test',
  label: 'Title',
  properties: {
    accountNumber: {
      type: 'string',
      title: 'Account number',
      required: true
    }
  }
}];
