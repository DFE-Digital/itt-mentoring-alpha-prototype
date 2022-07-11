module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const string = require('string')
  const _ = require('lodash');
  var filters = {}
  var nunjucksSafe = env.getFilter('safe')

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



  /*----------------------------------------------------------------
    Strings
  ================================================================= */

  // Create url / slugs from text
  // This is a heading => this-is-a-heading
  filters.slugify = (input) => {
    if (!input) throw "Error in slugify: no input", input;
    else return string(input).slugify().toString();
  }

  filters.startLowerCase = (input) => {
    if (!input) return '' // avoid printing false to client
    if (_.isString(input)){
      return input.charAt(0).toLowerCase() + input.slice(1);
    }
    else return input
  }
  
  // Get ordinal name
  filters.getOrdinalName = integer => {
    let ordinals = [
      'zeroth', // shouldn't be possible
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'ninth',
      'tenth'
    ]
    
    if (!_.isNumber(integer) || integer < 1 || integer > 10){
      console.log("Error in getOrdinalName: input out of bounds")
      return ""
    }
    else {
      return ordinals[integer]
    }
  }

  // Sentence case - uppercase first letter
  filters.sentenceCase = (input) => {
    if (!input) return '' // avoid printing false to client
    if (_.isString(input)){
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
    else return input
  }

  // Strip html
  filters.stripHtml = (input) => {
    return input.replace(/<[^>]*>?/gm, '');
  }

  /*------------------------------------------------------------------
    Numbers
  ==================================================================*/
  filters.stringToNumber = input => {
    return parseInt(input, 10)
  }

  filters.currency = input => {
    let inputAsInt = parseInt(input, 10)
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if ( inputAsInt > 0 ) { return `£${numberWithCommas(inputAsInt)}` }

    // makes negative number positive and puts minus sign in front of £
    else if ( inputAsInt < 0 ) { return `–£${numberWithCommas(inputAsInt * -1 )}` }
    else return '0'
  }


  /*----------------------------------------------------------------
    Arrays
  ================================================================= */

  // push an item in to an array. Returns the array
  // Usage: {% set array = ['a','b','c'] | push('d') %}

  filters.push = (array, item) => {
    let newArray = [...array]
    newArray.push(item)
    return newArray
  }


  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
