const string = require('string')
const _      = require('lodash');

var filters = {}

// slugify
// create url / slugs from text
// input:  'This is a string'
// output: 'this-is-string'
filters.slugify = (input) => {
  if (!input) throw "Error in slugify: no input", input;
  else return string(input).slugify().toString();
}

// camelize
// input:  "This is a string"
// output: "thisIsAString"
filters.camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

// camelToSentence
// camelCase to Sentence case
// input:  'thisIsAString'
// output: 'This is a string'
filters.camelToSentence = (string) => {
  let result = string.replace(/([A-Z])/g, " $1").toLowerCase()
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// sentence case
// uppercase first letter
// input:  'this is a String'
// output: 'This is a String'
filters.sentenceCase = (string) => {
  if (!string) return '' // avoid printing false to client
  if (_.isString(string)){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  else return string
}

// startLowerCase
// lowercase first letter
// input:  'This is a String'
// output: 'this is a String'
filters.startLowerCase = (input) => {
  if (!input) return '' // avoid printing false to client
  if (_.isString(input)){
    return input.charAt(0).toLowerCase() + input.slice(1);
  }
  else return input
}

// Get ordinal name
// input:  1
// output: 'first'
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


// stripHtml
// remove hmtl
// input:  <span class="app-nowrap">1 January 1970</span>
// output: '1 January 1970'
filters.stripHtml = (string) => {
  return string.replace(/<[^>]*>?/gm, '');
}

// nowrap
// add nowrap class to input
filters.nowrap = (input) => {
  return `<span class="app-nowrap">${input}</span>`
}

// Make a string possessive
// {{ "James Joyce" | possessive }}
//     James Joyce’s
// {{ "Joyce James" | possessive }}
//     Joyce James’
// {{ "JAMES JOYCE" | possessive }}
//     JAMES JOYCE’S
// {{ "Joyce James" | possessive }}
//     JOYCE JAMES’

filters.possessive = (noun) => {
  if (typeof noun !== 'string' || noun.length == 0) return ""

  const isAllUpperCase = (input) => {
    return input == input.toUpperCase()
  }

  const lastLetterOfNoun = noun.trim().slice(-1)

  if (lastLetterOfNoun == "s" || lastLetterOfNoun == "S") {
    return noun + "’"
  } else if (isAllUpperCase(noun)) {
    return noun + "’S"
  } else if (! isAllUpperCase(noun)) {
    return noun + "’s"
  } else {
    console.log("Error with possessive filter")
  }
}

// Split a string using a separator
filters.split = (string, separator) => {
  if (!string || typeof string != "string") return
  else return string.split(separator)
}

exports.filters = filters
