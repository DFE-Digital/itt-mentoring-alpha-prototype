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
  ],

  trainees: [
    {
      "identification": {
      "givenName":  "Jane",
      "familyName": "Smith",
      "trn":        "1551883"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (G622)"
      }
    },
    {
      "identification": {
      "givenName":  "Samantha",
      "familyName": "Koch",
      "trn":        "1743356"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Mathematics",
        "courseNameLong":  "Mathematics (X348)"
      }
    },
    {
      "identification": {
      "givenName":  "Jill",
      "familyName": "Bachmann",
      "trn":        "8909748"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with social sciences",
        "courseNameLong":  "Biology with social sciences (N656)"
      }
    },
    {
      "identification": {
      "givenName":  "Rachel",
      "familyName": "Laverty",
      "trn":        "9672556"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Primary with English",
        "courseNameLong":  "Primary with English (L109)"
      }
    },
    {
      "identification": {
      "givenName":  "George",
      "familyName": "Briggs",
      "trn":        "8411978"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (T672)"
      }
    },
    {
      "identification": {
      "givenName":  "Becky",
      "familyName": "Brothers",
      "trn":        "8123503"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Part time",
        "courseNameShort": "Physics with chemistry",
        "courseNameLong":  "Physics with chemistry (H968)"
      }
    },
    {
      "identification": {
      "givenName":  "Honorine",
      "familyName": "Renault",
      "trn":        "1675046"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "French",
        "courseNameLong":  "French (K466)"
      }
    },
    {
      "identification": {
      "givenName":  "Craig",
      "familyName": "Stroman",
      "trn":        "9252148"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Latin",
        "courseNameLong":  "Latin (F001)"
      }
    },
    {
      "identification": {
      "givenName":  "Miranda",
      "familyName": "Walter",
      "trn":        "7785421"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Physics with chemistry",
        "courseNameLong":  "Physics with chemistry (F893)"
      }
    },
    {
      "identification": {
      "givenName":  "Essie",
      "familyName": "Durgan",
      "trn":        "8694898"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (L971)"
      }
    },
    {
      "identification": {
      "givenName":  "Harriet",
      "familyName": "Wilkinson",
      "trn":        "4808581"
      },
      "courseDetails": {
        "route":           "Teaching apprenticeship (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with chemistry",
        "courseNameLong":  "Physical education with chemistry (G271)"
      }
    },
    {
      "identification": {
      "givenName":  "Shelia",
      "familyName": "Kozey",
      "trn":        "7839154"
      },
      "courseDetails": {
        "route":           "Teaching apprenticeship (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G647)"
      }
    },
    {
      "identification": {
      "givenName":  "Emily",
      "familyName": "Feest",
      "trn":        "3508938"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (A124)"
      }
    },
    {
      "identification": {
      "givenName":  "Sally",
      "familyName": "Denesik",
      "trn":        "8405624"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (B057)"
      }
    },
    {
      "identification": {
      "givenName":  "Delia",
      "familyName": "Klein",
      "trn":        "1529428"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (Y932)"
      }
    },
    {
      "identification": {
      "givenName":  "Martin",
      "familyName": "Cable",
      "trn":        "7731875"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with mathematics",
        "courseNameLong":  "Primary with mathematics (B057)"
      }
    },
    {
      "identification": {
      "givenName":  "Javier",
      "familyName": "Crist",
      "trn":        "8773574"
      },
      "courseDetails": {
        "route":           "High potential initial teacher training (HPITT)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary",
        "courseNameLong":  "Primary (Y938)"
      }
    },
    {
      "identification": {
      "givenName":  "Alonzo",
      "familyName": "Leuschke",
      "trn":        "4599126"
      },
      "courseDetails": {
        "route":           "High potential initial teacher training (HPITT)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with geography and history",
        "courseNameLong":  "Primary with geography and history (L724)"
      }
    },
    {
      "identification": {
      "givenName":  "Jeff",
      "familyName": "VonRueden",
      "trn":        "1268124"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with biology",
        "courseNameLong":  "Physical education with biology (E777)"
      }
    },
    {
      "identification": {
      "givenName":  "Bea",
      "familyName": "Waite",
      "trn":        "2006629"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Spanish",
        "courseNameLong":  "Spanish (C404)"
      }
    },
    {
      "identification": {
      "givenName":  "Michele",
      "familyName": "Bartoletti",
      "trn":        "8885301"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Italian",
        "courseNameLong":  "Italian (Q586)"
      }
    },
    {
      "identification": {
      "givenName":  "Stanley",
      "familyName": "Champlin",
      "trn":        "7281755"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Primary",
        "courseNameLong":  "Primary (A489)"
      }
    },
    {
      "identification": {
      "givenName":  "Swassane",
      "familyName": "Berger",
      "trn":        "6516771"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Full time",
        "courseNameShort": "Italian",
        "courseNameLong":  "Italian (Q586)"
      }
    },
    {
      "identification": {
      "givenName":  "Betty",
      "familyName": "Dupuy",
      "trn":        "6353649"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Part time",
        "courseNameShort": "Physical education",
        "courseNameLong":  "Physical education (Z210)"
      }
    },
    {
      "identification": {
      "givenName":  "Tricia",
      "familyName": "Mertz",
      "trn":        "2595391"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with English",
        "courseNameLong":  "Primary with English (L109)"
      }
    },
    {
      "identification": {
      "givenName":  "Juana",
      "familyName": "Baumbach",
      "trn":        "3710844"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physics with biology",
        "courseNameLong":  "Physics with biology (B639)"
      }
    },
    {
      "identification": {
      "givenName":  "Mégane",
      "familyName": "Leroux",
      "trn":        "3183173"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with modern languages",
        "courseNameLong":  "Primary with modern languages (D196)"
      }
    },
    {
      "identification": {
      "givenName":  "Alexis",
      "familyName": "Block",
      "trn":        "3041494"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Modern languages",
        "courseNameLong":  "Modern languages (B887)"
      }
    },
    {
      "identification": {
      "givenName":  "Sharon",
      "familyName": "Bergnaum",
      "trn":        "6306010"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (E076)"
      }
    },
    {
      "identification": {
      "givenName":  "Troy",
      "familyName": "Romaguera",
      "trn":        "7216207"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)"
      }
    },
    {
      "identification": {
      "givenName":  "Lana",
      "familyName": "Cardno",
      "trn":        "6737688"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)"
      }
    },
    {
      "identification": {
      "givenName":  "Darren",
      "familyName": "Perry",
      "trn":        "6287363"
      },
      "courseDetails": {
        "route":           "School direct (salaried)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (X602)"
      }
    },
    {
      "identification": {
      "givenName":  "Jodie",
      "familyName": "Fletcher",
      "trn":        "1776765"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)"
      }
    },
    {
      "identification": {
      "givenName":  "Justine",
      "familyName": "Simon",
      "trn":        "8594837"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)"
      }
    },
    {
      "identification": {
      "givenName":  "Marilyn",
      "familyName": "Moore",
      "trn":        "7159145"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Japanese",
        "courseNameLong":  "Japanese (G132)"
      }
    },
    {
      "identification": {
      "givenName":  "Angela",
      "familyName": "Scholz",
      "trn":        "8229967"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)"
      }
    },
    {
      "identification": {
      "givenName":  "Olga",
      "familyName": "Satterfield",
      "trn":        "3719255"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Full time",
        "courseNameShort": "Modern languages",
        "courseNameLong":  "Modern languages (H984)"
      }
    },
    {
      "identification": {
      "givenName":  "Donnie",
      "familyName": "Kling",
      "trn":        "6814241"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (K054)"
      }
    },
    {
      "identification": {
      "givenName":  "Jerome",
      "familyName": "Pfeffer",
      "trn":        "1789750"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (F855)"
      }
    },
    {
      "identification": {
      "givenName":  "Ben",
      "familyName": "Jones",
      "trn":        "6292096"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Part time",
        "courseNameShort": "Biology with chemistry",
        "courseNameLong":  "Biology with chemistry (E076)"
      }
    },
    {
      "identification": {
      "givenName":  "Kari",
      "familyName": "Bartell",
      "trn":        "9391115"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (F855)"
      }
    },
    {
      "identification": {
      "givenName":  "Amber",
      "familyName": "Effertz",
      "trn":        "6789465"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)"
      }
    },
    {
      "identification": {
      "givenName":  "Eunice",
      "familyName": "Smith",
      "trn":        "6067301"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)"
      }
    },
    {
      "identification": {
      "givenName":  "Ysaline",
      "familyName": "Dupont",
      "trn":        "9651847"
      },
      "courseDetails": {
        "route":           "Provider-led (postgrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with modern languages",
        "courseNameLong":  "Primary with modern languages (D735)"
      }
    },
    {
      "identification": {
      "givenName":  "Alicia",
      "familyName": "Luettgen",
      "trn":        "2618627"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Full time",
        "courseNameShort": "Primary with physical education",
        "courseNameLong":  "Primary with physical education (G642)"
      }
    },
    {
      "identification": {
      "givenName":  "Aurélie",
      "familyName": "Michel",
      "trn":        "6423056"
      },
      "courseDetails": {
        "route":           "Assessment only",
        "studyMode":       "Full time",
        "courseNameShort": "Physical education with physics",
        "courseNameLong":  "Physical education with physics (Y387)"
      }
    },
    {
      "identification": {
      "givenName":  "Angeline",
      "familyName": "Mercier",
      "trn":        "9392797"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Design and technology",
        "courseNameLong":  "Design and technology (T402)"
      }
    },
    {
      "identification": {
      "givenName":  "Fulgence",
      "familyName": "Vasseur",
      "trn":        "2406388"
      },
      "courseDetails": {
        "route":           "Provider-led (undergrad)",
        "studyMode":       "Full time",
        "courseNameShort": "Biology with music",
        "courseNameLong":  "Biology with music (M945)"
      }
    }
  ]


}
