const express = require('express')
const router = express.Router()
const _ = require('lodash')
const getSchools = () => {
  return require('./data/gis-schools.js')
}

  /*
    ==================================================================
    Shared
    ==================================================================
  */

  function getNextPage(currentPage, routing) {
    let nextPage = routing.pageOrder.indexOf(currentPage) + 1
    return routing.folder + `${ routing.pageOrder[nextPage] }`
  }


  /*
    ==================================================================
    Schools
    ==================================================================
  */

  const generalMentorRouting = {
    pageOrder: [
      'school',
      'providers',
      '0/mentors',
      'email-address',
      'check-your-answers',
      'confirmation'
    ],
    folder: '/general-mentor-grant/'
  }


  router.post('/general-mentor-grant/school-answer', function(req, res){
    const data = req.session.data
    console.log({ data })

    /* 
      Store school data for autcomplete
    */
    const schools = getSchools()

    // Input added with js by the autocomplete
    let autocompleteRawValue = req.body?._autocomplete_raw_value_school_picker

    // School selected via autocomplete
    let autocompleteUuid = req.body?._autocomplete_result_uuid

    // AutocompleteUuid isn’t always reliable
    // If a user has made a valid selection then goes back to edit their answer, autocompleteUuid will be filled
    // with their previous answer. If they then type something new in to the autocomplete but don’t pick an answer,
    // then the old Uuid will get submitted. Here we check that the school name for the provided Uuid matches the
    // raw autocomplete string submitted. If they don’t match, wipe the UUID as it’s invalid - and instead we should
    // run a string search for the given name.
    if (autocompleteUuid && autocompleteRawValue){
      let selectedSchool = schools.find(school => school.uuid == autocompleteUuid)
      if (selectedSchool?.schoolName != autocompleteRawValue){
        autocompleteUuid = undefined
      }
    }

    // Used for no-js searching
    // Or where a user types in to the autocomplete too quickly
    /*
      let schoolSearchTerm = (!autocompleteUuid && autocompleteRawValue) || req.body?._schoolSearch || false

      let searchResultRadios = req.body?._searchResultRadios
      let schoolResultUuid = (searchResultRadios && searchResultRadios != 'searchAgain') ? searchResultRadios : false
    */

    // Uuid could come via two form inputs
    let schoolUuid = autocompleteUuid /*|| schoolResultUuid */ || false 

    // Search again
    /*
    if (schoolSearchTerm && !schoolUuid && leadSchoolApplicable){
      let queryParams = utils.addQueryParam(referrer, `_schoolSearch=${schoolSearchTerm}`)
      res.redirect(`${recordPath}/schools/lead-school${queryParams}`)
    }
    */
    // No answer given and no search term
    /*else*/ if (!schoolUuid){
      res.redirect(`/general-mentor-grant/school`)
    }
    else {
      let selectedSchool = schools.find(school => school.uuid == schoolUuid)

      // Seed records might have schools that aren't in our schools list
      // This may happen if a user tries to edit an existing seed record
      if (!selectedSchool) {
        console.log(`School not found - you probably need to update the seed records`)
      }
      else {
        // Using _.set as lead school might not exist yet
        _.set(data, 'school', selectedSchool)
      }
      // If school is not in Teacher Pension Service (this list is a proxy)
      if (!data.stateSchools.includes(data.school.type)) {
        data.mainstreamSchool = false
      } else {
        data.mainstreamSchool = true
      }
      if (data.grantBeingAppliedFor == 'generalMentorTraining') {
        res.redirect('/general-mentor-grant/v2/school')
      } else {
        res.redirect(getNextPage('school', generalMentorRouting))
      }
    }
  })

  router.post('/general-mentor-grant/v2/school/answer', function(req, res){

    const data = req.session.data

    let schoolSection  = data.generalMentorTaskList.school

    if (data.tempSchoolStatus == "Completed"){
      schoolSection.href   = "/general-mentor-grant/v2/school"
      schoolSection.status = "Completed"
      delete data.tempSchoolStatus
    } else if(data.school && data.tempSchoolStatus != "Completed"){
      schoolSection.href   = "/general-mentor-grant/v2/school"
      schoolSection.status = "In progress"
      delete data.tempSchoolStatus
    } else {
      schoolSection.href   = "/general-mentor-grant/v2/school-answer"
      schoolSection.status = "Not started"
    }

    if (data.school && data.generalMentorTaskList.providers.status == "Cannot start yet"){
      data.generalMentorTaskList.providers.status = "Not started"
      if (data.providersFromRegister.length > 0){
        data.generalMentorTaskList.providers.href = "/general-mentor-grant/v2/provider/confirm"
      } else {
        data.generalMentorTaskList.providers.href = "/general-mentor-grant/v2/provider/0/add"
      }
    }

    res.redirect('/update-task-list-count')
  })

  /* remove empty providers */
  router.post('/general-mentor-grant/providers-answer', function(req, res){
    const data = req.session.data
    
    data.providers = data.providers.filter(provider => provider.name != '')

    /* Set a random provider for demoing */
    if (data.providers.length == 0) {
      data.providers[0] = _.sample([{'name': 'Webury Hill SCITT'}, {'name': 'King’s Oak University'}])
    }

    if (data.grantBeingAppliedFor == 'generalMentorTraining') {
      res.redirect('/update-task-list-count')
    } else {
      res.redirect(getNextPage('providers', generalMentorRouting))
    }

  })

  router.get('/general-mentor-grant/:providerIndex/mentors', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    res.render('general-mentor-grant/mentors', {
      providerIndex
    })
  })

  router.post('/general-mentor-grant/:providerIndex/mentors-answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let providerCount = data.providers.length
    
    /* remove empty mentors */
    data.mentors = data.mentors.filter(mentor => mentor["Name"] != '' || mentor.trn != '')

    /* hacky way of removing empty teaching hours */
    /* to do: clean this up in the view */
    data.mentors.forEach(mentor => {
      mentor["Training time"] = mentor["Training time"].filter(value => value != '')
    })

    /* add mentor to provider */
    data.providers[providerIndex].mentors = data.mentors

    if (providerIndex < providerCount - 1){
      res.redirect(`/general-mentor-grant/${ providerIndex + 1 }/mentors`)
    } else {
      res.redirect(getNextPage('0/mentors', generalMentorRouting))
    }
  })

  /* mop-up empty fields for demoing */
  router.post('/general-mentor-grant/email-address-answer', function(req, res){
    /* Set an example email address */
    const data = req.session.data
    if (data.email == '') {
      data.email = 'example@example.com'
    }
    /* Set an example mentor */
    if (data.providers[0].mentors.length == 0) {
      data.providers[0].mentors = [{'Name': 'Firstname Lastname', 'trn': '0000000', 'Date of birth': [1,1,1990], 'Training time': 20}]
    }

    /* Update total hours */
    data.totalTrainingHours = data?.providers.map(provider => {
      return mentorHours = provider?.mentors.map(mentor =>{
        return parseInt(mentor["Training time"]) || 0
      }).reduce((partialSum, a) => partialSum + a, 0) || 0
    }).reduce((partialSum, a) => partialSum + a, 0)

    /* Hourly rate given school location */
    data.hourlyRate = data.regionalAmounts.find(regionalAmount => regionalAmount.region == data.schoolRegion ).value / 20

    /* Update max claim value */
    data.maxClaim = data.hourlyRate * data.totalTrainingHours

    res.redirect(getNextPage('email-address', generalMentorRouting))
  })

  router.post('/general-mentor-grant/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith('-answer')) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, generalMentorRouting))
    } else {
      next()
    }
  })

  router.get('/general-mentor-grant/answer', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = null
    res.redirect('/general-mentor-grant/school')
  })


  /*
    Version 2
  */

  // set route from sign-in
  router.get('/general-mentor-grant/v2/setup-general-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'generalMentorTraining'
    data.school = null
    res.redirect('/dfe-sign-in')
  })

  // if data has been reset while on v2 index,
  // make sure user is still routed back to index
  router.get('/general-mentor-grant/v2/school-answer', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'generalMentorTraining'
    data.school = null
    res.redirect('/general-mentor-grant/school')
  })

  /* Show user providers from Register */
  router.get('/general-mentor-grant/v2/provider/check-confirmed', function(req, res){
    const data = req.session.data
    if (data.providersFromRegister.length == 0) {
      res.redirect('/general-mentor-grant/v2/provider/0/add')
    } else if(data.providers.length > 0){
      res.redirect('/general-mentor-grant/v2/provider/')
    } else {
      res.redirect('/general-mentor-grant/v2/provider/confirm')
    }
  })

  /* Store providers from Register */
  router.post('/general-mentor-grant/v2/provider/confirm-answer', function(req, res){
    const data = req.session.data

    if(!data.tempProviderStore) {
      res.redirect('/general-mentor-grant/v2/provider/confirm')
    } else {
      /* Handle none */

      /* if user selects 'none', remove it from the list */
      data.tempProviderStore = data.tempProviderStore.filter(provider => provider != 'none' && provider != '_unchecked')

      /* deletes previous answers if users selects 'none' after setting provider */
      if (data.tempProviderStore.length == 0){
        data.providers = []
        res.redirect('/general-mentor-grant/v2/provider/0/add')
      }

      /* store provider’s with key of 'name' */

      /* temp store for providers to store providers by name */
      data.tempProviderStore.forEach(providerName => {
        if(!data.providers.some(provider => provider.name == providerName)){
          data.providers.push({ 'name': providerName, 'status': 'Not started' })
        }
      })

      delete data.tempProviderStore
      res.redirect('/general-mentor-grant/v2/provider')
    }

  })

  /* Render page to add providers not from Register */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/add', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    res.render('general-mentor-grant/v2/provider/add', {
      providerIndex
    })
  })

  /* store user generated providers */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/add-answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)

    if (data.tempProviderStore !== '') {
      if(!data.providers[providerIndex]){
        /* store new provider */
        data.providers[providerIndex] = { 'name': data.tempProviderStore, 'status': 'Not started' }
      } else {
        /* only overwrite the name if the user changes the provider name */
        data.providers[providerIndex] = {
          'name':    data.tempProviderStore,
          'status':  data.providers[providerIndex].status,
          'mentors': data.providers[providerIndex].mentors
        }
      }
      delete data.tempProviderStore

      /* clear claim amount */
      if (data.generalMentorTaskList.claimAmount.status != "Cannot start yet") {
        data.generalMentorTaskList.claimAmount.status = "Not started"
      }

      res.redirect('/general-mentor-grant/v2/provider')
    } else {
      res.render('general-mentor-grant/v2/provider/add', {
        providerIndex
      })
    }
  })

  /* remove provider */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/remove', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    res.render('general-mentor-grant/v2/provider/remove', {
      providerIndex
    })
  })

  router.get('/general-mentor-grant/v2/provider/:providerIndex/remove-answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)

    data.providers = data.providers.filter(provider => provider.name !== data.providers[providerIndex].name)
    
    if (data.providers.length == 0) {
      data.generalMentorTaskList.providers.status = "Not started"
    }

    if (data.generalMentorTaskList.claimAmount.status != "Cannot start yet") {
      data.generalMentorTaskList.claimAmount.status = "Not started"
    }

    res.redirect('/general-mentor-grant/v2/provider')
  })


  router.get('/general-mentor-grant/v2/provider/:providerIndex/check-for-mentors', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)

    if (data.providers[ providerIndex ]?.mentors?.length == 0 || !data.providers[ providerIndex ]?.mentors) {
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor/0/identity`)
    } else {
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor`)
    }

  })


  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)

    res.render('general-mentor-grant/v2/provider/general-mentor/index', {
      providerIndex
    })
  })


  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/identity', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex   = parseInt(req.params.mentorIndex)

    res.render('general-mentor-grant/v2/provider/general-mentor/identity', {
      providerIndex, mentorIndex
    })
  })


  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/training-hours', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex   = parseInt(req.params.mentorIndex)
    res.render('general-mentor-grant/v2/provider/general-mentor/training-hours', {
      providerIndex, mentorIndex
    })
  })

  router.post(
    '/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/identity-answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)

    let providerMentors = data.providers[ providerIndex ].mentors
    let mentor = data?.mentor

    if (mentor) {

      if (!providerMentors) {
        providerMentors = []
      }

      if (providerMentors[ mentorIndex ]) {
        providerMentors[ mentorIndex ] = mentor
      } else {
        providerMentors.push(mentor)
      }
      data.providers[ providerIndex ].mentors = providerMentors
    } else {
      console.log( "Error — mentor not found" )
    }
    delete data.mentor

    /* Creates full name */
    data.providers[ providerIndex ].mentors[ mentorIndex ]["Full name"] = data.providers[ providerIndex ].mentors[ mentorIndex ].firstNames + " " + data.providers[ providerIndex ].mentors[ mentorIndex ].lastNames


    /* Routing if trainee is not in TPS */
    if( data.providers[providerIndex].mentors[ mentorIndex ].firstNames == "Karen" ) {
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor/${ mentorIndex }/not-recognised`)
    } else {
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor/${ mentorIndex }/training-hours`)
    }
  })


  /* If trainee not found render mentor not recognised */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/not-recognised', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)
    res.render('general-mentor-grant/v2/provider/general-mentor/not-recognised', {
      providerIndex, mentorIndex
    })
  })

  /* Render training time page */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/training-hours', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)
    res.render('general-mentor-grant/v2/provider/general-mentor/training-hours', {
      providerIndex, mentorIndex
    })
  })

  /* Add training time to current mentor */
  router.post('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/training-hours-answer', function(req, res) {
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)

    let providerMentors = data.providers[ providerIndex ].mentors
    let mentor = data?.mentor

    if (mentor['Training time']) {
      /* Hacky way of cleaning up input */
      mentor['Training time'] = mentor['Training time'].filter(time => time != '' && time != 'mentor[Training time]')
      
      /* Adds training time to mentor */
      data.providers[ providerIndex ].mentors[ mentorIndex ]["Training time"] = mentor["Training time"]
      delete data.mentor
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor`)
    } else {
      res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor/${ mentorIndex }/training-hours`)
    }

    if (data.generalMentorTaskList.claimAmount.status != "Cannot start yet") {
      data.generalMentorTaskList.claimAmount.status = "Not started"
    }

  })

  /* render remove mentor */
  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/remove', function(req, res) {
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)
    res.render('general-mentor-grant/v2/provider/general-mentor/remove', {
      providerIndex, mentorIndex
    })
  })

  /* remove mentor */
  router.post('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/:mentorIndex/remove-answer', function(req, res){
    const data = req.session.data

    let providerIndex = parseInt(req.params.providerIndex)
    let mentorIndex = parseInt(req.params.mentorIndex)

    data.providers[ providerIndex ].mentors = data.providers[ providerIndex ].mentors.filter(mentor => mentor.firstNames !== data.providers[providerIndex].mentors[mentorIndex].firstNames )

    if (data.providers[ providerIndex ].mentors.length == 0) {
      data.providers[providerIndex].status = "Not started"
      delete data.mentorsForProviderStatus
    }

    if (data.generalMentorTaskList.claimAmount.status != "Cannot start yet") {
      data.generalMentorTaskList.claimAmount.status = "Not started"
    }

    res.redirect(`/general-mentor-grant/v2/provider/${ providerIndex }/general-mentor`)
  })

  router.get('/general-mentor-grant/v2/provider/:providerIndex/general-mentor/answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)


    if (!data.providers[ providerIndex ].mentors.length == 0 && data.mentorsForProviderStatus == "Completed"){
      data.providers[ providerIndex ]["status"] = "Completed"
    } else if (data.providers[ providerIndex ].mentors.length > 0) {
      data.providers[ providerIndex ]["status"] = "In progress"
    } else {
      data.providers[ providerIndex ]["status"] = "Not started"
    }
    delete data.mentorsForProviderStatus
    res.redirect('/update-task-list-count')
  })

  router.get('/general-mentor-grant/v2/provider-answer', function(req, res){
    const data = req.session.data

    let providersSection = data.generalMentorTaskList.providers

    if(data.providers.length > 0) {
      if (data.tempProvidersStatus == "Completed"){
        providersSection.href   = "/general-mentor-grant/v2/provider/"
        providersSection.status = "Completed"
        delete data.tempProvidersStatus
      } else if (data.providers.length > 0 && data.tempProvidersStatus != "Completed"){
        providersSection.href   = "/general-mentor-grant/v2/provider/"
        providersSection.status = "In progress"
        delete data.tempProvidersStatus
      } else {
        providersSection.status = "Not started"
        if (data.providersFromRegister){
          providersSection.href = "/general-mentor-grant/v2/provider/check-confirmed"
        } else {
          providersSection.href = "/general-mentor-grant/v2/provider/add"
        }
      }
    } else {
      providersSection.status = "Not started"
    }

    res.redirect('/update-task-list-count')
  })


  /* Application count */
  router.get('/update-task-list-count', function(req, res){
    const data = req.session.data

    let sectionsCompleteCount = 0

    if (data.generalMentorTaskList.school.status == "Completed") {
      sectionsCompleteCount += 1
    }

    if (data.generalMentorTaskList.providers.status == "Completed") {
      sectionsCompleteCount += 1
    }

    let allProvidersComplete = false

    if (data.providers.length > 0) {
      allProvidersComplete = data.providers.every(provider => provider?.status == "Completed")
    }

    if (allProvidersComplete == true) {
      sectionsCompleteCount += 1
    }

    if (allProvidersComplete == true && data.generalMentorTaskList.claimAmount.status == "Cannot start yet") {
      data.generalMentorTaskList.claimAmount.status = "Not started"
    }

    data.generalMentorTaskList.sectionsComplete = sectionsCompleteCount

    /* Update total hours */
    if (allProvidersComplete == true) {
      data.totalTrainingHours = data?.providers.map(provider => {
        return mentorHours = provider?.mentors.map(mentor =>{
          return parseInt(mentor["Training time"]) || 0
        }).reduce((partialSum, a) => partialSum + a, 0) || 0
      }).reduce((partialSum, a) => partialSum + a, 0)
    }

    /* Hourly rate given school location */
    data.hourlyRate = data.regionalAmounts.find(regionalAmount => regionalAmount.region == data.schoolRegion ).value / 20

    /* Update max claim value */
    data.maxClaim = data.hourlyRate * data.totalTrainingHours

    res.redirect('/general-mentor-grant/v2/overview')
  })

  router.post('/general-mentor-grant/v2/claim-amount-answer', function(req, res){
    const data = req.session.data

    /* Clean up claim amount */
    if(Array.isArray(data.actualClaim) == true){
      data.actualClaim = data.actualClaim.filter(item => item != "less")
    }

    if (data.actualClaim != 0) {
      data.generalMentorTaskList.claimAmount.status = "Completed"
    }

    res.redirect('/general-mentor-grant/v2/overview')
  })



  /*
    ==================================================================
    Providers
    ==================================================================
  */

  /*
    Lead mentor
  */

  router.get('/lead-mentor-grant/setup-lead-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'leadMentor'
    res.redirect('/dfe-sign-in')
  })

  const leadMentorRouting = {
    pageOrder: [
        'lead-mentors',
        'claim-value',
        'evidence',
        'check-your-answers',
        'confirmation'
      ],
    folder: '/lead-mentor-grant/'
  }

  router.post('/lead-mentor-grant/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith('-answer')) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, leadMentorRouting))
    } else {
      next()
    }
  })

  /*
    Intensive training and practice grant
  */

  router.get('/itp-grant/setup-itp', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'intensiveTrainingAndPractice'
    res.redirect('/dfe-sign-in')
  })


  const itpRouting = {
    pageOrder: [
        'weeks',
        'claim-value',
        'evidence',
        'check-your-answers',
        'confirmation'
      ],
    folder: '/itp-grant/'
  }



  router.post('/itp-grant/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith('-answer')) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, itpRouting))
    } else {
      next()
    }
  })

module.exports = router
