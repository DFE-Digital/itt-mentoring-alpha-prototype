/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn’t already exist. This may be useful for testing
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
    "University of Greenwich",
    "Gorse SCITT"
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
  schoolRegion: "Fringe",
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
  
  // For ITP, if we know the provider is a SCITT, we don’t need to show undergrad
  // in production this should be calculated on whether the provider has any undergrad trainees
  providerType: "hei",

  /*
    Provider list
  */

  ittProviders: [
    "Edge Hill University",
    "Sheffield Hallam University",
    "University College London",
    "Birmingham City University",
    "University of Cumbria",
    "Canterbury Christ Church University",
    "Liverpool Hope University",
    "The University of Brighton",
    "University of Chester",
    "Roehampton University",
    "St Mary’s University",
    "Liverpool John Moores University",
    "University of Worcester",
    "Bishop Grosseteste University",
    "University of Winchester",
    "University of East London",
    "University of Sunderland",
    "University of Derby",
    "University of Reading",
    "University of the West of England, Bristol",
    "University of Warwick",
    "Bath Spa University",
    "Newman University",
    "University Of Exeter",
    "The University Of Manchester",
    "University of Sussex",
    "University of Hertfordshire",
    "Leeds Trinity University",
    "University of Wolverhampton",
    "Nottingham Trent University",
    "Goldsmiths, University of London",
    "University of Buckingham",
    "University of Chichester",
    "The Manchester Metropolitan University",
    "Coventry University",
    "Middlesex University",
    "The University Of Birmingham",
    "York St John University",
    "Plymouth Marjon University",
    "University Of Plymouth",
    "University of Cambridge",
    "University of Durham",
    "University of Gloucestershire",
    "University of Bedfordshire",
    "Bradford College",
    "Leeds Beckett University",
    "University of Greenwich",
    "Oxford Brookes University",
    "The University Of East Anglia",
    "University of Nottingham",
    "e-Qualitas",
    "Kingston University",
    "Staffordshire University",
    "University of Hull",
    "University Of Oxford",
    "United Teaching National SCITT ",
    "University of Southampton",
    "Teach First",
    "London Metropolitan University",
    "Harris ITE",
    "University Of Bristol",
    "King’s College London",
    "University of Northumbria at Newcastle",
    "Brunel University London",
    "Newcastle University",
    "The University of Portsmouth",
    "Oxfordshire Teacher Training",
    "The University Of Sheffield",
    "London South Bank University",
    "The University of Northampton",
    "University of Huddersfield",
    "Loughborough University",
    "The National Mathematics and Physics SCITT",
    "University College Birmingham",
    "Primary Catholic Partnership SCITT",
    "The John Taylor SCITT",
    "Yorkshire Wolds Teacher Training ",
    "Mid Essex Initial Teacher Training",
    "Bromley Schools’ Collegiate",
    "Wessex Schools Training Partnership",
    "Altius Teacher Training",
    "Haybridge Alliance SCITT",
    "Tes Institute",
    "Ripley TSA SCITT",
    "Somerset SCITT Consortium",
    "Sussex Teacher Training Partnership",
    "Two Mile Ash ITT Partnership",
    "Suffolk and Norfolk Primary SCITT",
    "Royal Academy of Dance",
    "Bourton Meadow Initial Teacher Training Centre",
    "Prince Henry’s High School & South Worcestershire SCITT",
    "Inspiring Leaders - Teacher Training",
    "Partnership London SCITT (PLS)",
    "Teach Kent & Sussex",
    "Keele and North Staffordshire Teacher Education",
    "George Spencer Academy SCITT",
    "The Cambridge Partnership",
    "Yorkshire and Humber Teacher Training",
    "University of Leicester",
    "Cambridge Teaching Schools Network, CTSN SCITT",
    "Red Kite Teacher Training",
    "SCITT in East London Schools (SCITTELS)",
    "Sutton Park SCITT",
    "North Essex Teacher Training (NETT)",
    "Prestolee SCITT",
    "South West Teacher Training",
    "Suffolk and Norfolk Secondary SCITT",
    "The Learning Institute South West",
    "The OAKS (Ormiston and Keele SCITT)",
    "The University Of Bolton",
    "Buckingham Partnership",
    "Colchester Teacher Training Consortium",
    "EAST SCITT",
    "Exceed SCITT",
    "Gorse SCITT",
    "Astra SCITT",
    "Bright Futures SCITT",
    "Kent and Medway Training",
    "Royal Borough of Windsor & Maidenhead SCITT",
    "The Shire Foundation",
    "CREC Early Years Partnership",
    "Essex Primary SCITT",
    "Forest Independent Primary Collegiate SCITT",
    "Gateshead Primary SCITT",
    "Nottinghamshire TORCH SCITT",
    "Star Teachers SCITT",
    "Stockton-on-Tees Teacher Training Partnership",
    "Sutton SCITT",
    "Titan Partnership Ltd",
    "University Of York",
    "Wandsworth Primary Schools’ Consortium",
    "ARK Teacher Training",
    "Barr Beacon SCITT",
    "Cornwall SCITT",
    "Essex Teacher Training",
    "Essex and Thames SCITT",
    "Fareham and Gosport Primary SCITT",
    "Inspiration Teacher Training",
    "Leicester & Leicestershire SCITT",
    "Leicestershire Secondary SCITT",
    "South Birmingham SCITT",
    "Surrey South Farnham SCITT",
    "Teach SouthEast",
    "The National Modern Languages SCITT",
    "The Sheffield SCITT",
    "2Schools Consortium",
    "Arthur Terry School SCITT",
    "Ashton on Mersey School SCITT",
    "Associated Merseyside Partnership SCITT ",
    "Bishop’s Stortford SCITT",
    "Bluecoat SCITT Alliance Nottingham",
    "Bournemouth Poole & Dorset Teacher Training Partnership",
    "Compton SCITT",
    "Cumbria Primary Teacher Training",
    "Durham SCITT",
    "East of England Teacher Training",
    "Educate Group Initial Teacher Training",
    "Future Teacher Training ",
    "GLF Schools’ Teacher Training",
    "George Abbot SCITT",
    "Kirklees and Calderdale SCITT",
    "London District East SCITT",
    "London East Teacher Training Alliance",
    "Mersey Boroughs ITT Partnership",
    "Mid Somerset Consortium for Teacher Training",
    "NELTA",
    "Norfolk Teacher Training Centre",
    "North Manchester ITT Partnership",
    "Redcar and Cleveland Teacher Training Partnership",
    "St. George’s Academy Partnership",
    "TKAT SCITT",
    "The Basingstoke Alliance SCITT",
    "The Coventry SCITT",
    "The Deepings SCITT",
    "The South Downs SCITT",
    "Three Counties Alliance SCITT",
    "Tudor Grange SCITT",
    "i2i Teaching Partnership"
  ]


}
