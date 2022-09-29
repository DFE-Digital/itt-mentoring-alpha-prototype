const _ = require('lodash')

module.exports = router => {

  // set route from sign-in
  router.get('/general-mentor-grant/v2/setup-general-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'generalMentorTraining'
    data.school = null
    res.redirect('/general-mentor-grant/v2/dfe-sign-in')
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
}
