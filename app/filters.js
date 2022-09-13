const fs = require('fs')
const path = require('path')
const individualFiltersFolder = path.join(__dirname, './filters')
const string      = require('string')
const _           = require('lodash')
const moment      = require('moment')


module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */

  var filters       = {}

  var nunjucksSafe  = env.getFilter('safe')

  // Import filters from filters folder
  if (fs.existsSync(individualFiltersFolder)) {
    var files = fs.readdirSync(individualFiltersFolder)
    files.forEach(file => {
      let fileData = require(path.join(individualFiltersFolder, file))
      // Loop through each exported function in file (likely just one)
      Object.keys(fileData).forEach((filterGroup) => {
        // Get each method from the file
        Object.keys(fileData[filterGroup]).forEach(filterName => {
          filters[filterName] = fileData[filterGroup][filterName]
        })
      })
    })
  }


  /* utils */
  filters.makeDataAvailable = (data, name = 'jsData') => {
    return nunjucksSafe('<script>let ' + name + ' =' + JSON.stringify(data, null, '\t') + '</script>')
  }

  // Decorate attributes
  // Add name, value, id, idPrefix and checked attributes to GOVUK form components
  // Generate the attributes based on the application ID and the section they’re in

  // Copied from Apply, but modified to work with data directly

  /* Usage: 
  {{ govukCheckboxes({
    fieldset: {
      legend: {
        text: "Nationality",
        classes: "govuk-fieldset__legend--s"
      }
    },
    items: [
      {
        text: "British"
      },
      {
        text: "Irish"
      },
      {
        text: "Other"
      }
    ]
  } | decorateAttributes(data, "data.nationality"))}}

  Will populate name and id, and add value and checked for each item
  */
  filters.decorateAttributes = (obj, data, value) => {

    // Map dot or bracket notation to path parts
    pathParts = _.toPath(value)
    // Path parts includes the string name of data, which we don't need
    let storedValue = _.get(data, [...pathParts].splice(1) )

    // Strip data from path as autodata store auto-adds it.
    if (pathParts[0] === 'data'){
      pathParts.shift(1)
    }

    if (obj.items !== undefined) {
      obj.items = obj.items.map(item => {
        if (item.divider) return item

        var checked = storedValue ? '' : item.checked
        var selected = storedValue ? '' : item.selected
        if (typeof item.value === 'undefined') {
          item.value = item.text
        }

        // If data is an array, check it exists in the array
        if (Array.isArray(storedValue)) {
          if (storedValue.indexOf(item.value) !== -1) {
            checked = 'checked'
            selected = 'selected'
          }
        } else {
          // The data is just a simple value, check it matches
          if (storedValue === item.value) {
            checked = 'checked'
            selected = 'selected'
          }
        }

        item.checked = (item.checked !== undefined) ? item.checked : checked
        item.selected = (item.selected !== undefined) ? item.selected : selected
        return item
      })

      obj.idPrefix = (obj.idPrefix) ? obj.idPrefix : pathParts.join('-')
    } else {
      // Check for undefined because the value may exist and be intentionally blank
      if (typeof obj.value === 'undefined') {
        obj.value = storedValue
      }
    }
    obj.id = (obj.id) ? obj.id : pathParts.join('-')
    obj.name = (obj.name) ? obj.name: pathParts.map(s => `[${s}]`).join('')
    return obj
  }

  filters.highlightInvalidInputs = function(data, params={}){

    let value = data.value

    if (value && value.includes('**invalid**')) {
      params.type = 'invalid'
      // Using .apply() to pass on value of 'this'
      data = exports.markInput.apply(this, [data, params])
    }

    if (value && value.includes('**missing**')) {
      params.type = 'missing'
      // Using .apply() to pass on value of 'this'
      data = exports.markInput.apply(this, [data, params])
    }

    return data
  }

  filters.falsify = (input) => {
    if (!input) return false
    if (input == null) return false
    if (input == undefined) return false
    if (_.isNumber(input)) return input
    else if (input == false) return false
    if (_.isString(input)){
      let truthyValues = ['yes', 'true']
      let falsyValues = ['no', 'false']
      if (truthyValues.includes(input.toLowerCase())) return true
      else if (falsyValues.includes(input.toLowerCase())) return false
    }
    return input;
  }

  filters.includes = (route, string) =>{
    if (route && route.includes(string)) {
      return true
    } else {
      return false
    }
  }


  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
