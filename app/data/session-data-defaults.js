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
  schoolRegion: "Rest of England",
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

  // Using this for routing through shared pages
  // Lead mentor - leadMentor
  // Intensive Training and Practice Grant - intensiveTrainingAndPracticeGrant
  grantBeingAppliedFor: null,
  
  // For ITP, if we know the provider is a SCITT, we don’t need to show undergrad
  // in production this should be calculated on whether the provider has any undergrad trainees
  providerType: "scitt",

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
  ],

  trainees: [
    {
      "identification": {
      "givenName":  "Jane",
      "familyName": "Smith",
      "reference": "XE8301",
      "trn":        "1551883"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (G622)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Samantha",
      "familyName": "Koch",
      "reference": "SS7197",
      "trn":        "1743356"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Mathematics",
        "courseNameLong":  "Mathematics (X348)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Jill",
      "familyName": "Bachmann",
      "reference": "WC8006",
      "trn":        "8909748"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with social sciences",
        "courseNameLong":  "Biology with social sciences (N656)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Rachel",
      "familyName": "Laverty",
      "reference": "TC0098",
      "trn":        "9672556"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Primary with English",
        "courseNameLong":  "Primary with English (L109)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Lee",
      "familyName": "Hazlewood",
      "reference": "TP2771",
      "trn":        "8411978"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (T672)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Becky",
      "familyName": "Brothers",
      "reference": "XS0128",
      "trn":        "8123503"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Part time",
        "courseNameShort": "Physics with chemistry",
        "courseNameLong":  "Physics with chemistry (H968)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Honorine",
      "familyName": "Renault",
      "reference": "QC4145",
      "trn":        "1675046"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "French",
        "courseNameLong":  "French (K466)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Craig",
      "familyName": "Stroman",
      "reference": "WN7814",
      "trn":        "9252148"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Latin",
        "courseNameLong":  "Latin (F001)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Miranda",
      "familyName": "Walter",
      "reference": "CS8639",
      "trn":        "7785421"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Physics with chemistry",
        "courseNameLong":  "Physics with chemistry (F893)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Essie",
      "familyName": "Durgan",
      "reference": "WK2480",
      "trn":        "8694898"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (L971)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Harriet",
      "familyName": "Wilkinson",
      "reference": "NH4119",
      "trn":        "4808581"
      },
      "courseDetails": {
        "route":           "Teaching apprenticeship (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with chemistry",
        "courseNameLong":  "Physical education with chemistry (G271)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Shelia",
      "familyName": "Kozey",
      "reference": "XQ2178",
      "trn":        "7839154"
      },
      "courseDetails": {
        "route":           "Teaching apprenticeship (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G647)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Emily",
      "familyName": "Feest",
      "reference": "CH0600",
      "trn":        "3508938"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (A124)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Sally",
      "familyName": "Denesik",
      "reference": "ZZ8176",
      "trn":        "8405624"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (B057)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Delia",
      "familyName": "Klein",
      "reference": "EF5779",
      "trn":        "1529428"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (Y932)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Martin",
      "familyName": "Cable",
      "reference": "SD4874",
      "trn":        "7731875"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (B057)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Javier",
      "familyName": "Crist",
      "reference": "WT8778",
      "trn":        "8773574"
      },
      "courseDetails": {
        "route":           "High potential initial teacher training (HPITT)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary",
        "courseNameLong":  "Primary (Y938)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Alonzo",
      "familyName": "Leuschke",
      "reference": "ET1604",
      "trn":        "4599126"
      },
      "courseDetails": {
        "route":           "High potential initial teacher training (HPITT)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with geography and history",
        "courseNameLong":  "Primary with geography and history (L724)",
        "status":          "Withdrew"
      }
    },
    {
      "identification": {
      "givenName":  "Jeff",
      "familyName": "VonRueden",
      "reference": "NG0760",
      "trn":        "1268124"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with biology",
        "courseNameLong":  "Physical education with biology (E777)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Bea",
      "familyName": "Waite",
      "reference": "MG5752",
      "trn":        "2006629"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Spanish",
        "courseNameLong":  "Spanish (C404)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Michele",
      "familyName": "Bartoletti",
      "reference": "EQ7471",
      "trn":        "8885301"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Italian",
        "courseNameLong":  "Italian (Q586)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Stanley",
      "familyName": "Champlin",
      "reference": "YK3407",
      "trn":        "7281755"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Primary",
        "courseNameLong":  "Primary (A489)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Swassane",
      "familyName": "Berger",
      "reference": "RE6018",
      "trn":        "6516771"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Italian",
        "courseNameLong":  "Italian (Q586)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Betty",
      "familyName": "Dupuy",
      "reference": "HM1350",
      "trn":        "6353649"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (Z210)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Tricia",
      "familyName": "Mertz",
      "reference": "NK7804",
      "trn":        "2595391"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with English",
        "courseNameLong":  "Primary with English (L109)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Juana",
      "familyName": "Baumbach",
      "reference": "FM5221",
      "trn":        "3710844"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physics with biology",
        "courseNameLong":  "Physics with biology (B639)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Mégane",
      "familyName": "Leroux",
      "reference": "DD7917",
      "trn":        "3183173"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with modern languages",
        "courseNameLong":  "Primary with modern languages (D196)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Alexis",
      "familyName": "Block",
      "reference": "BX1852",
      "trn":        "3041494"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Modern languages",
        "courseNameLong":  "Modern languages (B887)",
        "status":          "Withdrew"
      }
    },
    {
      "identification": {
      "givenName":  "Sharon",
      "familyName": "Bergnaum",
      "reference": "PB3346",
      "trn":        "6306010"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (E076)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Troy",
      "familyName": "Romaguera",
      "reference": "PR2821",
      "trn":        "7216207"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)",
        "status":          "Withdrew"
      }
    },
    {
      "identification": {
      "givenName":  "Lana",
      "familyName": "Cardno",
      "reference": "LG1154",
      "trn":        "6737688"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Darren",
      "familyName": "Perry",
      "reference": "TQ9132",
      "trn":        "6287363"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (X602)",
        "status":          "Withdrew"
      }
    },
    {
      "identification": {
      "givenName":  "Jodie",
      "familyName": "Fletcher",
      "reference": "PF7429",
      "trn":        "1776765"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Justine",
      "familyName": "Simon",
      "reference": "YQ4961",
      "trn":        "8594837"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Marilyn",
      "familyName": "Moore",
      "reference": "MA4768",
      "trn":        "7159145"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Japanese",
        "courseNameLong":  "Japanese (G132)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Angela",
      "familyName": "Scholz",
      "reference": "ZM2864",
      "trn":        "8229967"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Olga",
      "familyName": "Satterfield",
      "reference": "RP7075",
      "trn":        "3719255"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Modern languages",
        "courseNameLong":  "Modern languages (H984)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Donnie",
      "familyName": "Kling",
      "reference": "PC5723",
      "trn":        "6814241"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (K054)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Jerome",
      "familyName": "Pfeffer",
      "reference": "LZ3264",
      "trn":        "1789750"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (F855)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Ben",
      "familyName": "Jones",
      "reference": "DH8307",
      "trn":        "6292096"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (E076)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Kari",
      "familyName": "Bartell",
      "reference": "XA2058",
      "trn":        "9391115"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (F855)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Amber",
      "familyName": "Effertz",
      "reference": "FM4041",
      "trn":        "6789465"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Eunice",
      "familyName": "Smith",
      "reference": "MR0294",
      "trn":        "6067301"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Ysaline",
      "familyName": "Dupont",
      "reference": "PX9959",
      "trn":        "9651847"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with modern languages",
        "courseNameLong":  "Primary with modern languages (D735)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Alicia",
      "familyName": "Luettgen",
      "reference": "LA3595",
      "trn":        "2618627"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Aurélie",
      "familyName": "Michel",
      "reference": "TD6982",
      "trn":        "6423056"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Angeline",
      "familyName": "Mercier",
      "reference": "FK9515",
      "trn":        "9392797"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (T402)",
        "status":          "Completed"
      }
    },
    {
      "identification": {
      "givenName":  "Fulgence",
      "familyName": "Vasseur",
      "reference": "MQ9596",
      "trn":        "2406388"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with music",
        "courseNameLong":  "Biology with music (M945)",
        "status":          "Completed"
      }
    }
  ],


  "postgradTrainees": null

}
