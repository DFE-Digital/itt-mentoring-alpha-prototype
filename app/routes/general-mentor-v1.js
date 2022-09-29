const _ = require('lodash')
const getSchools = () => {
  return require('../data/gis-schools.js')
}

module.exports = router => {

  function getNextPage(currentPage, routing) {
    let nextPage = routing.pageOrder.indexOf(currentPage) + 1
    return routing.folder + `${ routing.pageOrder[nextPage] }`
  }

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

}
