/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  


  /* add/remove providers */
  let providerCount = 1

  let addRemoveItems = function(itemName, maxItems){
    $('#add-' + itemName ).click(function(event){
      event.preventDefault(); // cancel default behavior
      
    }
  }

  addRemoveItems(provider, 5)
  addRemoveItems(teacher, 5)

  $('#addProviderButton').click(function(event)
    {
      event.preventDefault(); // cancel default behavior
      $('#provider-' + providerCount).removeClass('app-hidden')
      $('#removeProviderLink-' + (providerCount - 1)).addClass('app-hidden')
      $('#removeProviderLink-' + (providerCount)).removeClass('app-hidden')
      providerCount = providerCount + 1
      console.log(providerCount)
      if (providerCount == 5) {
        $('#addProviderButton').addClass('app-hidden')
      }
    });

  for (let step = 0; step < 5; step++) {
    $('#removeProviderLink-' + step).click(function(event)
      {
        event.preventDefault(); // cancel default behavior

        $('#provider-' + (providerCount - 1)).addClass('app-hidden')
        $('#removeProviderLink-' + (providerCount - 1)).addClass('app-hidden')
        $('#removeProviderLink-' + (providerCount - 2)).removeClass('app-hidden')
        providerCount = providerCount - 1
        console.log(providerCount)
        if (providerCount == 4) {
          $('#addProviderButton').removeClass('app-hidden')
        }
    });
  }


  /* add/remove teachers */
  
  for (let step = 0; step < 5; step++) {
    if (step > 0) {
      $('#teacher-' + step).addClass('app-hidden')
    }
  }

  let teacherCount  = 0
  $('#addTeacherButton').click(function(event) {
    event.preventDefault(); // cancel default behavior
    teacherCount = teacherCount + 1
    $('#teacher-' + teacherCount).removeClass('app-hidden')
    $('#removeTeacherLink-' + teacherCount).removeClass('app-hidden')
    $('#removeTeacherLink-' + (teacherCount -1 )).addClass('app-hidden')
    if (teacherCount > 3) {
      $('#addTeacherButton').addClass('app-hidden')
    }
    console.log(teacherCount)
  });

  $('#removeTeacherLink-' + (teacherCount + 1 )).click(function(event) {
    event.preventDefault(); // cancel default behavior
    console.log(teacherCount)
    $('#removeTeacherLink-' +  (teacherCount + 1 )).addClass('app-hidden')
    $('#teacher-' + (teacherCount)).addClass('app-hidden')
    teacherCount = teacherCount - 1
  });

  window.GOVUKFrontend.initAll()
})
