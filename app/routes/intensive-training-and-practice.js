module.exports = router => {

  function getNextPage(currentPage, routing) {
    let nextPage = routing.pageOrder.indexOf(currentPage) + 1
    return routing.folder + `${ routing.pageOrder[nextPage] }`
  }


  router.get('/itp-grant/setup-itp', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = 'intensiveTrainingAndPractice'

    /* Sort list by surnames */
    data.trainees = data.trainees.sort((a, b) => a.identification.familyName.localeCompare(b.identification.familyName))

    /* Get trainees who are postgrad and completed */
    data.postgradTrainees = data.trainees.filter(trainee => trainee.courseDetails.status == 'Completed' && !trainee.courseDetails.route.toLowerCase().includes('undergrad'))

    /* Get trainees who are undergrad and completed */
    if (data.providerType == "hei") {
      data.undergradTrainees = data.trainees.filter(trainee => trainee.courseDetails.status == 'Completed' && trainee.courseDetails.route.toLowerCase().includes('undergrad'))
    }

    /* Get trainees who deferred or withdrew */
    data.incompleteTrainees = data.trainees.filter(trainee => trainee.courseDetails.status != 'Completed')

    res.redirect('/itp-grant/dfe-sign-in')
  })

  const itpRouting = {
    pageOrder: [
        'postgrad-trainees',
        'claim-value',
        'evidence',
        'check-your-answers',
        'confirmation'
      ],
    folder: '/itp-grant/'
  }

  router.post('/itp-grant/all-postgrad-trainees-answer', function(req, res){
    const data = req.session.data

    if (data.allPostgrad == "yes") {
      data.postgradTrainees.forEach(trainee => {
        trainee.itpWeeks = 4
      })
      if (data.undergradTrainees) {
        res.redirect('/itp-grant/all-undergrad-trainees')
      } else if (data.incompleteTrainees.length > 0) {
        res.redirect('/itp-grant/incomplete-trainees')
      } else {
        res.redirect('/itp-grant/calculate-claim')
      }
    } else {
      res.redirect('/itp-grant/postgrad-trainees')
    }
  })

  router.post('/itp-grant/postgrad-trainees-answer', function(req, res){
    const data = req.session.data

    if (data.confirmedPostgradTRNs) {

      /* Clean up data from postgrad-trainees-answers */
      data.confirmedPostgradTRNs = data.confirmedPostgradTRNs.filter(trainee => trainee != 'selectAll' && trainee != '_unchecked')

      /* Set all confirmed trainees to 4 weeks of ITP */
      data.postgradTrainees.forEach(trainee => {
        data.confirmedPostgradTRNs.forEach(trn => {
          if (trainee.identification.trn == trn) {
            trainee.itpWeeks = 4
          }
        })
      })
    }

    /* Store any postgrad trainees did not do 4 weeks */
    data.unconfirmedPostgrads = data.postgradTrainees.filter(trainee => !trainee.itpWeeks)

    if (data.unconfirmedPostgrads.length == data.postgradTrainees.length) {
      res.redirect('/itp-grant/postgrad-trainees')
    } else if (data.unconfirmedPostgrads.length > 0) {
      res.redirect('/itp-grant/postgrad-how-many-weeks')
    } else if (data.undergradTrainees) {
      res.redirect('/itp-grant/all-undergrad-trainees')
    } else if (data.incompleteTrainees.length > 0) {
      res.redirect('/itp-grant/incomplete-trainees')
    } else {
      res.redirect('/itp-grant/calculate-claim')
    }
  })

  router.post('/itp-grant/postgrad-how-many-weeks-answer', function(req, res){
    const data = req.session.data

    /* Convert weeks of ITP into number */
    data.unconfirmedPostgrads.forEach((trainee, index) => {
      trainee.itpWeeks = parseInt(data.itpWeeks[index])
    })

    /* Store weeks of ITP against trainees */
    data.postgradTrainees.forEach(baseTrainee => {
      data.unconfirmedPostgrads.forEach(updatedTrainee => {
        if (baseTrainee.identification.trn == updatedTrainee.identification.trn) {
          baseTrainee.itpWeeks = updatedTrainee.itpWeeks
        }
      })
    })

    // delete data.unconfirmedPostgrads
    delete data.itpWeeks

    if (data.undergradTrainees) {
      res.redirect('/itp-grant/all-undergrad-trainees')
    } else if (data.incompleteTrainees.length > 0) {
      res.redirect('/itp-grant/incomplete-trainees')
    } else {
      res.redirect('/itp-grant/calculate-claim')
    }
  })

  router.post('/itp-grant/all-undergrad-trainees-answer', function(req, res){
    const data = req.session.data

    if (data.allUndergrad == "yes") {
      data.undergradTrainees.forEach(trainee => {
        trainee.itpWeeks = parseInt(data.undergradWeeksAll)
      })
      if (data.incompleteTrainees.length > 0) {
        res.redirect('/itp-grant/incomplete-trainees')
      } else {
        res.redirect('/itp-grant/calculate-claim')
      }
    } else {
      res.redirect('/itp-grant/undergrad-trainees')
    }
  })


  router.post('/itp-grant/undergrad-trainees-answer', function(req, res){
    const data = req.session.data

    /* Convert weeks of ITP into number */
    data.undergradTrainees.forEach((trainee, index) => {
      trainee.itpWeeks = parseInt(data.itpWeeks[index])
    })

    if (data.incompleteTrainees.length > 0) {
      res.redirect('/itp-grant/incomplete-trainees')
    } else {
      res.redirect('/itp-grant/calculate-claim')
    }

  })


  router.post('/itp-grant/incomplete-trainees-answer', function(req, res){
    const data = req.session.data

    /* Convert weeks of ITP into number */
    data.incompleteTrainees.forEach((trainee, index) => {
      trainee.itpWeeks = parseInt(data.itpWeeks[index])
    })

    res.redirect('/itp-grant/calculate-claim')

  })

  router.get('/itp-grant/calculate-claim', function(req, res){
    const data = req.session.data

    const postgradWeekValue  = 51
    const undergradWeekValue = 49.67

    let totalPostgradItpWeeks  = 0
    let totalUndergradItpWeeks = 0

    /* move postgrad data to all trainees */
    if (data.postgradTrainees) {
      data.trainees.forEach(baseTrainee => {
        data.postgradTrainees.forEach(updatedTrainee => {
          if (baseTrainee.identification.trn == updatedTrainee.identification.trn) {
            baseTrainee.itpWeeks = updatedTrainee.itpWeeks
          }
        })
      })
    }

    /* move undergrad data to all trainees */
    if (data?.undergradTrainees) {
      data.trainees.forEach(baseTrainee => {
        data?.undergradTrainees.forEach(updatedTrainee => {
          if (baseTrainee.identification.trn == updatedTrainee.identification.trn) {
            baseTrainee.itpWeeks = updatedTrainee.itpWeeks
          }
        })
      })
    }

    /* move incomplete data to all trainees */
    if (data.incompleteTrainees) {
      data.trainees.forEach(baseTrainee => {
        data.incompleteTrainees.forEach(updatedTrainee => {
          if (baseTrainee.identification.trn == updatedTrainee.identification.trn) {
            baseTrainee.itpWeeks = updatedTrainee.itpWeeks
          }
        })
      })
    }


    data.trainees.forEach(trainee => {
      /* Clean-up data */
      if (!Number.isInteger(trainee.itpWeeks)) {
        trainee.itpWeeks = 0
      }

      if (trainee.courseDetails.route.toLowerCase().includes('undergrad')) {
        totalUndergradItpWeeks = totalUndergradItpWeeks + trainee.itpWeeks
      } else {
        totalPostgradItpWeeks = totalPostgradItpWeeks + trainee.itpWeeks
      }

    let postgradItpValue = totalPostgradItpWeeks * postgradWeekValue
    let undergradItpValue = totalUndergradItpWeeks * undergradWeekValue


    /* Store in session data */
    data.totalPostgradItpWeeks = totalPostgradItpWeeks
    data.totalUndergradItpWeeks = totalUndergradItpWeeks
    data.totalItpClaimValue = postgradItpValue + undergradItpValue

    })

    res.redirect('/itp-grant/claim-value')
  })


  router.post('/itp-grant/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith('-answer')) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, itpRouting))
    } else {
      next()
    }
  })
}
