// Form-specific code
$(function() {
  // Update form according to current HTML data attributes values
  var diagramEl = $('.skills-diagram[data-cb-username]:first');
  $('#cb-username').val( diagramEl.data('cb-username') );
  $('#cb-subject').val( diagramEl.data('cb-subject') );

  /* Register form events */
  $('#cb-diagram-form').submit(function(e) {
    e.preventDefault();
  });

  // Activate Ladda button
  Ladda.bind( 'button.ladda-button', {
    callback: function(instance) {
      console.log('clicked and submitted');
      diagramEl.data('cb-username', $('#cb-username').val());
      diagramEl.data('cb-subject', $('#cb-subject').val());
      new CBSkillsDiagram( { container: diagramEl }, function() {
        instance.stop();
      });
    }
  });

});

