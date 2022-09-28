
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

    res.render('general-mentor-grant/v2/provider/general-mentor/identity', {
      mentorIndex
    })
  })

  router.post('/general-mentor-grant/v3/general-mentor/:mentorIndex/identity-answer', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)

    /* Store mentor */
    data.mentors[mentorIndex] = data.mentor

    data.mentors[mentorIndex].fullName = data.mentor.firstNames + " " + data.mentor.lastNames

    delete data.mentor

    res.redirect(`/general-mentor-grant/v3/general-mentor/${ mentorIndex }/providers-from-register`)
  })

  router.get('/general-mentor-grant/v3/general-mentor/:mentorIndex/providers-from-register', function(req, res){
    const data = req.session.data
    let mentorIndex = parseInt(req.params.mentorIndex)

    res.render('general-mentor-grant/v3/general-mentor/providers-from-register', {
      mentorIndex
    })
  })

  /* Store providers from Register */
  router.post('/general-mentor-grant/v3/general-mentor/mentorIndex/providers-from-register', function(req, res){
    const data = req.session.data

    /* To do */

  })

}
