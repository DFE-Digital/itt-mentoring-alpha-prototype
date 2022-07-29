var filters = {}

  // stringToNumber
  // input: '10'
  // output: 10
  filters.stringToNumber = input => {
    return parseInt(input, 10)
  }

  // stringToNumber
  // input: 1000
  // output: '£10,000'
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

exports.filters = filters
