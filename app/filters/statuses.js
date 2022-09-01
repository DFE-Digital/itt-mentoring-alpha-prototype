const _      = require('lodash');

var filters = {}

filters.getStatusClass = (status) => {
  switch (status) {
    // Application phases
    case 'Not started':
    case 'Incomplete':
    case 'Cannot start yet':
      return 'govuk-tag--grey'
    case 'Review':
      return 'govuk-tag--pink'
    case 'In progress':
      return 'govuk-tag--grey'
    case 'Completed':
      return 'govuk-tag--blue'
  }
}

exports.filters = filters
