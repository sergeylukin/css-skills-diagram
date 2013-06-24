// Form-specific code
$(function() {
  // Update form according to current HTML data attributes values
  var diagramEl = $('.skills-diagram:first');

  /* Register form events */
  $('#coderbits-diagram-form').submit(function(e) {
    e.preventDefault();
  });

  //Activate Ladda button
  Ladda.bind( 'button.ladda-button', {
    callback: function(instance) {

      var username = $('#coderbits-username').val(),
          subject  = $('#coderbits-subject').val();

      if( username == '' ) {
        instance.stop();
        return;
      }

      diagramEl.data('coderbits-username', username);
      diagramEl.data('coderbits-subject', subject);
      new CBSkillsDiagram( { container: diagramEl }, function() {
        instance.stop();
      });
    }
  });

});

