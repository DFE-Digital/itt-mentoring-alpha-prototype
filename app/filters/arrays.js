var filters = {}

// push
// push an item in to an array. Returns the array
// example: {% set array = ['a','b','c'] | push('d') %}
filters.push = (array, item) => {
  let newArray = [...array]
  newArray.push(item)
  return newArray
}

exports.filters = filters
