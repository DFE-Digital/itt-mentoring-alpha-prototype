const moment      = require('moment')

var filters = {}

//  arrayToDateObject
//  Convert array to javascript date object
//  input:  [1,2,2020]
//  output: 2020-02-01T00:00:00.000Z

filters.arrayToDateObject = (array) => {
  return new Date(array[2], array[1] -1, array[0])
}

//  govukDate
//  input:  [1,1,1970]
//  input:  1970-01-01T00:00.000Z
//  output: '1 January 1970'

filters.govukDate = (date, format) => {
  if (Array.isArray(date)){
    return filters.arrayToGovukDate(date, format)
  }
  else return filters.dateToGovukDate(date, format)
}

//  arrayToGovukDate
//  an internal function to be used by the govukDate filter
//  input:  [1,1,1970]
//  input:  1970-01-01T00:00.000Z
//  output: '1 January 1970'

filters.arrayToGovukDate = (array, format) => {
  let dateObject = filters.arrayToDateObject(array)
  let govukDate = filters.dateToGovukDate(dateObject, format)
  return govukDate
}

//  dateToGovukDate
//  internal function to be used by govukDate filter
//  input:  1970-01-01T00:00.000Z
//  output: '1 January 1970'

filters.dateToGovukDate = (date, format=false) => {
  if (date){
    let theDate = moment(date)
    if (theDate.isValid()){
      return theDate.format(format || 'D MMMM YYYY')
    }
  }
  return ''
}

exports.filters = filters
