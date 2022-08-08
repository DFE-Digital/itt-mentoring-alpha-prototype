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

  /*
    ========================================================================
    Schools
    ========================================================================
  */

  // Global variables
  maxProviders: 5,
  maxGeneralMentors: 5,
  mainstreamSchool: true,

  /* Prototype routes on whether a school is state school or not
     https://www.gov.uk/types-of-school */
  stateSchools: [
    "Academy converter",
    "Academy sponsor led",
    "Community school",
    "Community special school",
    "Pupil referral unit",
    "Voluntary aided school"
  ],

  /*
    Inner London    - 1072
    Outer London    -  965
    Fringe          -  902
    Rest of England -  876
  */
  amountForSession: 902,

  /*
    ========================================================================
    Providers
    ========================================================================
  */

  leadMentorMaxAmount: 9514,
  postgradWeekValue: 51,
  undergradWeekValue: 49.67,

  // Using this for routing through shared pages
  // Lead mentor - leadMentor
  // Intensive Training and Practice Grant - intensiveTrainingAndPracticeGrant
  grantBeingAppliedFor: null,
  
  // For ITP, if we know the provider is a SCITT, we don't need to show undergrad
  // in production this should be calculated on whether the provider has any undergrad trainees
  providerType: "hei"

}
