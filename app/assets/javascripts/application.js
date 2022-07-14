/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  
  // /* add/remove providers */
  // let providerCount = 1

  const addRemoveItems = function(itemName, maxItems){

    /* To do  - get this from filters */
    const ordinals = [
      'zeroth',
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

    /* Page always start with 1 item visible */
    let itemCount = 1

    /* Add items */
    $('#add-' + itemName ).click(function(event){
      event.preventDefault(); // cancel default behavior
      itemCount = itemCount + 1
      /* add the next input group*/
      $('#' + ordinals[itemCount] + "-" + itemName + "-input-group" ).toggleClass('app-display-hidden')
      $('#remove-' + ordinals[itemCount] + "-" + itemName ).toggleClass('app-display-hidden app-display-table')
      $('#remove-' + ordinals[itemCount - 1] + "-" + itemName ).toggleClass('app-display-hidden app-display-table')
      $('#' + itemName + "-" + itemCount).focus()
      /* Hide add button at max items */
      if (itemCount == maxItems) {
        $('#add-' + itemName ).toggleClass('app-display-hidden')
      }
    })

    /* Remove items */
    for (let step = 0; step < maxItems + 1; step++) {
      $('#remove-' + ordinals[step] + "-" + itemName ).click(function(event){
        event.preventDefault(); // cancel default behavior
        console.log(itemCount)
        $('#' + itemName + "-" + itemCount).focus()
        $('#' + ordinals[itemCount] + "-" + itemName + "-input-group" ).toggleClass('app-display-hidden')
        $('#remove-' + ordinals[itemCount] + "-" + itemName ).toggleClass('app-display-hidden app-display-table')
        $('#remove-' + ordinals[itemCount - 1] + "-" + itemName ).toggleClass('app-display-hidden app-display-table')
        itemCount = itemCount - 1
        if (itemCount == maxItems - 1){
          $('#add-' + itemName ).toggleClass('app-display-hidden')
        }
      })
    }
  }

  addRemoveItems('provider', sessionData.maxProviders)
  addRemoveItems('teacher', sessionData.maxGeneralMentors)

  window.GOVUKFrontend.initAll()
})
