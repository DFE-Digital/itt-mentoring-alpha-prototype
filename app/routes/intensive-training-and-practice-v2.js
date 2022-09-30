const seedRandom = require('seedrandom')
const weighted   = require('weighted')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

module.exports = router => {

  router.get('/itp-grant-v2/setup', function(req, res){
    const data = req.session.data

    /* Sort list by surnames */
    /* To do - sort by multiple factors */
    data.trainees = data.trainees.sort((a, b) => a.identification.familyName.localeCompare(b.identification.familyName))

    /* set itpWeeks */
    data.trainees.forEach(trainee => {
      if (trainee.courseDetails.status == 'Completed' && !trainee.courseDetails.route.toLowerCase().includes('undergrad')) {
        trainee.itpWeeks = 4
      } else if (trainee.courseDetails.status == 'Completed' && trainee.courseDetails.route.toLowerCase().includes('undergrad')) {
        trainee.itpWeeks = 2
      } else {
        trainee.itpWeeks = getRandomInt(0, 4)
      }
    })

    /* Get trainees who deferred or withdrew */
    data.incompleteTrainees = data.trainees.filter(trainee => trainee.courseDetails.status != 'Completed')

    /* Get undergrads and rename Completed to 'in training' */
    if (data.providerType == "hei") {
      data.undergradTrainees = data.trainees.filter(trainee => trainee.courseDetails.status == 'Completed' && trainee.courseDetails.route.toLowerCase().includes('undergrad'))
      data.undergradTrainees.forEach(trainee => {
        if (trainee.courseDetails.status == "Completed") {
          trainee.courseDetails.status = "In training"
        }
      })
    }

    data.postgradTrainees = data.trainees.filter(trainee => trainee.courseDetails.status == 'Completed' && !trainee.courseDetails.route.toLowerCase().includes('undergrad'))


    /* Give trainees a row number */
    data.trainees.forEach((trainee, index) => {
      trainee.rowNumber = index + 1
    })

    let randomSeeded = seedRandom("recommend")

    /* set errors */
    data.trainees.forEach(trainee => {
      trainee.uploadStatus = weighted.select(["error", "updated"], [0.05, 0.95], randomSeeded)
    })

    /* add error descriptions */
    data.trainees.forEach(trainee => {
      if (trainee.uploadStatus == "error") {
        if (trainee.courseDetails.route.toLowerCase().includes('undergrad')) {
          trainee.errorSummary = "You cannot claim for more than 6 weeks of ITP for undergraduate trainees"
          trainee.itpWeeks = 7
        } else if (trainee.courseDetails.route.toLowerCase().includes('postgrad')) {
          trainee.errorSummary = "You cannot claim for more than 4 weeks of ITP for undergraduate trainees"
          trainee.itpWeeks = 6
        } else {
          trainee.errorSummary = "Provider ID and TRN do not match a recognised trainee"
        }
      }
    })

    /* trainees with Errors */
    data.uploadErrors = data.trainees.filter(trainee => trainee.uploadStatus == "error")

    res.redirect('/itp-grant-v2/dfe-sign-in')

  })

  router.get('/itp-grant-v2/upload-file-answer', function(req, res){
    const data = req.session.data

    if (data.uploadErrors) {
      res.redirect('/itp-grant-v2/errors-found')
    } else {
      res.redirect('/itp-grant-v2/upload-summary')
    }
  })

  router.get('/itp-grant-v2/errors-found-answer', function(req, res) {
    const data = req.session.data


    data.postgradTraineeWeeks = 0
    data.postgradTrainees.forEach(trainee => {
      data.postgradTraineeWeeks = data.postgradTraineeWeeks + trainee.itpWeeks
    })

    data.undergradTraineeWeeks = 0
    data.undergradTrainees.forEach(trainee => {
      data.undergradTraineeWeeks = data.undergradTraineeWeeks + trainee.itpWeeks
    })

    data.incompleteTraineesWeeks = 0
    data.incompleteTrainees.forEach(trainee => {
      data.incompleteTraineesWeeks = data.incompleteTraineesWeeks + trainee.itpWeeks
    })

    data.postgradWeekValue  = 51
    data.undergradWeekValue = 49.67
    data.totalUndergradItpWeeks = 0
    data.totalPostgradItpWeeks = 0

    data.trainees.forEach(trainee => {
      if (trainee.courseDetails.route.toLowerCase().includes('undergrad')) {
        data.totalUndergradItpWeeks = data.totalUndergradItpWeeks + trainee.itpWeeks
      } else {
        data.totalPostgradItpWeeks = data.totalPostgradItpWeeks + trainee.itpWeeks
      }
    })

    let undergradItpValue = data.totalUndergradItpWeeks * data.undergradWeekValue
    let postgradItpValue = data.totalPostgradItpWeeks * data.postgradWeekValue

    data.totalItpClaimValue = postgradItpValue + undergradItpValue

    res.redirect('/itp-grant-v2/upload-summary')
  })


}
