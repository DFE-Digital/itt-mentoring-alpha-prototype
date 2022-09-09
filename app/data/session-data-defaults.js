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
  providersFromRegister: [
    "King’s Oak University",
    "Webury Hill SCITT"
  ],

  generalMentorTaskList: {
    school:
    {
      "href":   "/general-mentor-grant/v2/school-answer",
      "status": "Not started"
    },
    providers:
    {
      "status": "Cannot start yet",
    },
    claimAmount:
    {
      "href":   "/general-mentor-grant/v2/claim-amount",
      "status": "Cannot start yet"
    },
    sectionsComplete: 0,
  },

  providers: [],

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

  regionalAmounts: [
    { 
      region: "Inner London",
      value: 1072
    },
    { 
      region: "Outer London",
      value: 965
    },
    { 
      region: "Fringe",
      value: 902
    },
    { 
      region: "Rest of England",
      value: 876
    }
  ],
  schoolRegion: "Inner London",
  hourlyRate: 0,
  totalTrainingHours: 0,
  maxClaim: 0,
  actualClaim: 0,

  /*
    ========================================================================
    Providers
    ========================================================================
  */

  leadMentorMaxAmount: 9514,
  postgradWeekValue:     51,
  undergradWeekValue:    49.67,

  // Using this for routing through shared pages
  // Lead mentor - leadMentor
  // Intensive Training and Practice Grant - intensiveTrainingAndPracticeGrant
  grantBeingAppliedFor: null,
  
  // For ITP, if we know the provider is a SCITT, we don't need to show undergrad
  // in production this should be calculated on whether the provider has any undergrad trainees
  providerType: "hei"

}
