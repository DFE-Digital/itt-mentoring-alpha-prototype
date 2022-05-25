module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const string = require('string')
  var filters = {}

  /*----------------------------------------------------------------
    Strings
  ================================================================= */

  // Create url / slugs from text
  // This is a heading => this-is-a-heading
  filters.slugify = (input) => {
    if (!input) throw "Error in slugify: no input", input;
    else return string(input).slugify().toString();
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
