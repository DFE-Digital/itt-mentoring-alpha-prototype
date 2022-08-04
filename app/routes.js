const express = require('express')
const router = express.Router()
const _ = require('lodash')
const getSchools = () => {
  return require('./data/gis-schools.js')
}

  /*
    ========================================================================
    Shared
    ========================================================================
  */

  function getNextPage(currentPage, routing) {
    let nextPage = routing.pageOrder.indexOf(currentPage) + 1
    return routing.folder + `${ routing.pageOrder[nextPage] }`
  }


  /*
    ========================================================================
    Schools
    ========================================================================
  */

  const generalMentorRouting = {
    pageOrder: [
      'school',
      'providers',
      '0/teachers',
      'email-address',
      'check-your-answers',
      'confirmation'
    ],
    folder: "/claim-general-mentor-funding/"
  }


  router.post('/claim-general-mentor-funding/school-answer', function(req, res){
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
      res.redirect(`/claim-general-mentor-funding/school`)
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
      // If school is not in Teacger Pension Service (this list is a proxy), we need to do
      // something else
      if (!data.stateSchools.includes(data.school.type)) {
        data.mainstreamSchool = false
        res.redirect(getNextPage("school", generalMentorRouting))
      } else {
        data.mainstreamSchool = true
        res.redirect(getNextPage("school", generalMentorRouting))
      }
    }
  })

  /* remove empty providers */
  router.post('/claim-general-mentor-funding/providers-answer', function(req, res){
    const data = req.session.data
    data.providers = data.providers.filter(provider => provider.name != '')
    /* Set a random provider for demoing */
    if (data.providers.length == 0) {
      data.providers[0] = _.sample([{"name": "Webury Hill SCITT"}, {"name": "King’s Oak University"}])
    }
    res.redirect(getNextPage("providers", generalMentorRouting))
  })

  router.get('/claim-general-mentor-funding/:providerIndex/teachers', function(req, res){
    let providerIndex = parseInt(req.params.providerIndex)
    res.render('claim-general-mentor-funding/teachers', {
      providerIndex
    })
  })

  router.post('/claim-general-mentor-funding/:providerIndex/teachers-answer', function(req, res){
    const data = req.session.data
    let providerIndex = parseInt(req.params.providerIndex)
    let providerCount = data.providers.length
    
    /* remove empty teachers */
    data.teachers = data.teachers.filter(teacher => teacher.name != '' || teacher.trn != '')

    /* hacky way of removing empty teaching hours */
    /* to do: clean this up in the view */
    data.teachers.forEach(teacher => {
      teacher.trainingTime = teacher.trainingTime.filter(value => value != "")
    })

    /* add teacher to provider */
    data.providers[providerIndex].teachers = data.teachers

    if (providerIndex < providerCount - 1){
      res.redirect(`/claim-general-mentor-funding/${ providerIndex + 1 }/teachers`)
    } else {
      res.redirect(getNextPage("0/teachers", generalMentorRouting))
    }
  })

  /* mop-up empty fields for demoing */
  router.post('/claim-general-mentor-funding/email-address-answer', function(req, res){
    /* Set an example email address */
    const data = req.session.data
    if (data.email == "") {
      data.email = "example@example.com"
    }
    /* Set an example teacher */
    if (data.providers[0].teachers.length == 0) {
      data.providers[0].teachers = [{"name": "Firstname Lastname", "trn": "0000000", "dateOfBirth": [1,1,1990], "trainingTime": 20}]
    }
    res.redirect(getNextPage("email-address", generalMentorRouting))
  })

  router.post('/claim-general-mentor-funding/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith("-answer")) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, generalMentorRouting))
    } else {
      next()
    }
  })

  /*
    ========================================================================
    Providers
    ========================================================================
  */

  /*
    Lead mentor
  */

  router.get('/lead-mentor-grant/answer', function(req, res){
    const data = req.session.data
    data.grantBeingAppliedFor = "leadMentor"
    res.redirect('/sign-in')
  })

  const leadMentorRouting = {
    pageOrder: [
        'lead-mentors',
        'claim-value',
        'evidence',
        'check-your-answers',
        'confirmation'
      ],
    folder: "/lead-mentor-grant/"
  }

  router.post('/lead-mentor-grant/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith("-answer")) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage, leadMentorRouting))
    } else {
      next()
    }
  })


module.exports = router
