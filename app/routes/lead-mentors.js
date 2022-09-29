module.exports = router => {

  function getNextPage(currentPage, routing) {
    let nextPage = routing.pageOrder.indexOf(currentPage) + 1
    return routing.folder + `${ routing.pageOrder[nextPage] }`
  }

  router.get('/lead-mentor-grant/setup-lead-mentor', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'leadMentor'
    res.redirect('/lead-mentor-grant/dfe-sign-in')
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

}
