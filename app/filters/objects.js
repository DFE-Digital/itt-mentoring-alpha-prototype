// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
var _ = require('lodash');
// Leave this filters line
var filters = {}


// Delete a keys with blank values
filters.deleteBlankAttributes = (dictionary) => {
  // Don't modify the original
  var newDictionary = Object.assign({}, dictionary)
  Object.keys(newDictionary).forEach(key => {
    if (newDictionary[key] == "" || newDictionary[key] == undefined){
      delete newDictionary[key]
    }
  })
  return newDictionary;
}

filters.setAttribute = (dictionary, key, value) => {
  var newDictionary = Object.assign({}, dictionary);
  newDictionary[key] = value;
  return newDictionary;
}

// set attribute on object (or array of objects)
filters.addAttribute = (dictionary, key, value) => {
  if (Array.isArray(dictionary)){
    newArr = []
    dictionary.forEach(item => {
      var newItem = Object.assign({}, item)
      newItem[key] = value
      newArr.push(newItem)
    })
    return newArr
  }
  else {
    var newDictionary = Object.assign({}, dictionary);
    newDictionary[key] = value;
    return newDictionary;
  }
}

// Clear a single attribute
filters.clearAttribute = (dictionary, key) => {
  var newDictionary = Object.assign({}, dictionary);
  newDictionary[key] = '';
  return newDictionary;
}

// Rename a key on an object, preserving key order
filters.renameAttribute = (dictionary, oldKey, newKey) => {
  const keys = Object.keys(dictionary)
  const newObj = keys.reduce((acc, val)=>{
    if(val === oldKey){
        acc[newKey] = dictionary[oldKey]
    }
    else {
        acc[val] = dictionary[val]
    }
    return acc
  }, {})

  return newObj
};

// Delete a single attribute from an object or array of objects
filters.deleteAttribute = (input, attribute) => {

  const deleteAttributeFromObject = (object) =>{
    // Don't modify the original
    var newDictionary = Object.assign({}, object)
    delete newDictionary[attribute]
    return newDictionary
  }

  // Array of objects
  if (_.isArray(input)){
    return input.map(deleteAttributeFromObject)
  }
  // Single object
  else return deleteAttributeFromObject(input)
}

// Delete a keys with blank values
filters.deleteBlankAttributes = (dictionary) => {
  // Don't modify the original
  var newDictionary = Object.assign({}, dictionary)
  Object.keys(newDictionary).forEach(key => {
    if (newDictionary[key] == "" || newDictionary[key] == undefined){
      delete newDictionary[key]
    }
  })
  return newDictionary;
}

// Filter results for only those containing attribute and value
filters.where = (arr, key, compare) => {
  arr = arr || [] 
  compare = [].concat(compare) // force to arr
  let filtered = arr.filter(item => {
    return compare.includes(_.get(item, key))
  })
  return filtered
}

// Remove items with a specified attribute and value
filters.removeWhere = (arr, key, compare) => {
  compare = [].concat(compare) // force to arr
  let filtered = arr.filter(item => {
    return !compare.includes(_.get(item, key))
  })
  return filtered
}



// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
