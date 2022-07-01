const express = require('express')
const router = express.Router()
const _ = require('lodash')
const getSchools = () => {
  return require('./data/gis-schools.js')
}


  function getNextPage(currentPage) {
    const pageOrder = 
    [
      'which-school',
      'which-providers',
      'how-many-teachers',
      'email-address',
      'check-your-answers',
      'confirmation'
    ]
    let nextPage = pageOrder.indexOf(currentPage) + 1
    return `/claim-general-mentor-funding/${ pageOrder[nextPage] }`
  }

  router.post('/claim-general-mentor-funding/which-school-answer', function(req, res){
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
      res.redirect(`/claim-general-mentor-funding/which-school`)
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
      res.redirect(getNextPage("which-school"))
    }
  })

  router.post('/claim-general-mentor-funding/:lastPage', function(req, res, next){
    let lastPage = req.params.lastPage
    if (lastPage.endsWith("-answer")) {
      currentPage = lastPage.substr(0, lastPage.length - 7)
      res.redirect(getNextPage(currentPage))
    } else {
      next()
    }
  })

module.exports = router
