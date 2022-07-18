/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Global variables
  maxProviders: 5,
  maxGeneralMentors: 5,

  /*
    Inner London    - 1072
    Outer London    -  965
    Fringe          -  902
    Rest of England -  876
  */
  amountForSession: 902

}
