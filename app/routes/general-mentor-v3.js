
module.exports = router => {

  /* Setup */
  router.get('/general-mentor-grant/v3/setup-general-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'generalMentorTrainingV3'
    data.school = null
    res.redirect('/general-mentor-grant/v3/dfe-sign-in')
  })

  /* =================================================================

  Mentors

  ================================================================= */

  /* Render mentor identity page */
  router.get('/general-mentor-grant/v3/general-mentor/:mentorIndex/identity', function(req, res){
    let mentorIndex = parseInt(req.params.mentorIndex)

    res.render('general-mentor-grant/v3/general-mentor/identity', {
      mentorIndex
    })
  })

  router.post('/general-mentor-grant/v3/general-mentor/:mentorIndex/identity-answer', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)

    data.mentors = []

    /* Store mentor */
    data.mentors[mentorIndex] = {
      "identity": data.mentor,
      "providers": []
    }

    data.mentors[mentorIndex]["identity"]["fullName"] = data.mentor.firstNames + " " + data.mentor.lastNames

    delete data.mentor

    res.redirect(`/general-mentor-grant/v3/general-mentor/${ mentorIndex }/providers/known-providers`)
  })

  router.get('/general-mentor-grant/v3/general-mentor/:mentorIndex/providers/known-providers', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)

    res.render('general-mentor-grant/v3/general-mentor/providers/known-providers', {
      mentorIndex
    })
  })

  /* Store providers from Register against mentor */
  router.post('/general-mentor-grant/v3/general-mentor/:mentorIndex/providers/known-providers-answer', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)

    
    if(!data.tempProviders) {
      res.redirect(`/general-mentor-grant/v3/general-mentor/${ mentorIndex }/providers/known-providers`)
    } else {

      /* clean up "None of these providers" */
      data.tempProviders = data.tempProviders.filter(provider => provider != 'none' && provider != '_unchecked')
      
      if (data.tempProviders.length == 0){
        res.redirect(`/general-mentor-grant/v3/general-mentor/${ mentorIndex }/providers/0/add-provider`)
      } else {
        
        data.tempProviders.forEach(provider => {
          data.mentors[mentorIndex].providers.push({ "name": provider })
        })

        res.redirect('/general-mentor-grant/v3/general-mentors')
      }
    }
  })

  /* Render add provider */
  router.get('/general-mentor-grant/v3/general-mentor/:mentorIndex/providers/:providerIndex/add-provider', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)
    let providerIndex = parseInt(req.params.providerIndex)

    res.render("general-mentor-grant/v3/general-mentor/providers/add-provider", {
      mentorIndex,
      providerIndex
    })
  })

  /* Store provider */
  router.post('/general-mentor-grant/v3/general-mentor/:mentorIndex/providers/:providerIndex/add-provider-answer', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)
    let providerIndex = parseInt(req.params.providerIndex)

    /* Store provider againt mentor */
    if (!data.mentors[mentorIndex].providers.includes( {"name": data.tempProvider})){
      data.mentors[mentorIndex].providers.push({ "name": data.tempProvider })
    }

    /* Add provider to known list */
    if (!data.providersFromRegister.includes( data.tempProvider )){
      data.providersFromRegister.push( data.tempProvider )
      data.providersFromRegister = data.providersFromRegister.sort((a, b) => a.localeCompare(b))
    }

    delete data.tempProvider

    res.redirect(`/general-mentor-grant/v3/general-mentors`)
  })

}
