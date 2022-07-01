/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  
  // /* add/remove providers */
  // let providerCount = 1

  const addRemoveItems = function(itemName, maxItems){

    /* Page always start with 1 item visible */
    let itemCount = 1
    let itemPrefix = sessionData.ordinals

    /* Add items */
    $('#add' + itemName ).click(function(event){
      event.preventDefault(); // cancel default behavior
      $('#' + sessionData.ordinals[itemCount] + itemName ).toggleClass('app-hidden')
      $('#remove' + sessionData.ordinals[itemCount] + itemName ).toggleClass('app-hidden')
      $('#remove' + sessionData.ordinals[itemCount - 1] + itemName ).toggleClass('app-hidden')
      $('#' + itemName + itemCount).focus()
      itemCount = itemCount + 1
      /* Hide add button once at max items */
      if (itemCount == maxItems) {
        $('#add' + itemName ).toggleClass('app-hidden')
      }
    })

    /* Remove items */
    for (let step = 0; step < maxItems + 1; step++) {
      $('#remove' + sessionData.ordinals[step] + itemName ).click(function(event){
        itemCount = itemCount - 1
        $('#' + itemName + itemCount).focus()
        $('#' + sessionData.ordinals[itemCount] + itemName ).toggleClass('app-hidden')
        $('#remove' + sessionData.ordinals[itemCount] + itemName ).toggleClass('app-hidden')
        $('#remove' + sessionData.ordinals[itemCount - 1] + itemName ).toggleClass('app-hidden')
        if (itemCount == maxItems - 1){
          $('#add' + itemName ).toggleClass('app-hidden')
        }
      })
    }
  }

  addRemoveItems('Provider', sessionData.maxProviders)
  addRemoveItems('Teacher', sessionData.maxTeachers)

  window.GOVUKFrontend.initAll()
})
