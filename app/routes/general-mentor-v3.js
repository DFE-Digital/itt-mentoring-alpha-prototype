
module.exports = router => {

  /* Setup */
  router.get('/general-mentor-grant/v3/setup-general-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'generalMentorTrainingV3'
    data.school = null
    res.redirect('/general-mentor-grant/v3/dfe-sign-in')
  })

}
