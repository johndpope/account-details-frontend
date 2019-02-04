# v0.8.1
## Fix build by removing unused CSS pipeline

# v0.8.0
## Add optional locale parameter, switch to React style callbacks
We switch from the '&' syntax to '<' to allow the component to be wrapped with angular2react.

# v0.7.2
## Use the real V2 requirements API in the demo page

# v0.7.1
## Add INR to demo

# v0.7.0
## Add support for global USD
Introduce a target country selector and pass country to requirements.

# v0.6.2
## Improve internationalisation
Allow the save button label to be passed in.  Use the legalType value labels
from the API response.

# v0.6.1
## Add better support for custom name formats
Correct Russian and South African formats

# v0.6.0
## Add support for creating accounts for a quote
Sometimes the requirements may vary based on some property of the quote e.g.
amount.  You can now pass in a quote id to take that into account.

# v0.5.0
## Add a component for looking up uniqueId recipients by email
Allow the user to choose whether to send to the unique id or to enter details manually.

# v0.4.0
## Add a component for creating accounts of any currency
Asks the user to choose the currency and then updates the form to ask for the
correct fields.

# v0.3.0
## Add a component for creating accounts of a specific currency
Given a currency the component will request the requirements and render a
dynamic form. On submit it will validate and trigger handlers for success/failure

# v0.2.0
## Add a service for interacting with the account details APIs
Adds a service that can be used to load & refresh requirements, to save new
accounts, and to lookup accounts by email.

# v0.1.0
## Add legacy service
Adds a service that can be used to deal with legacy formats and missing fields
in our APIs

#v0.0.1
## Set up repository and build
