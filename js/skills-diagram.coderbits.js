/*
 * Class CBSkillsDiagram
 *
 * Rrenders pure CSS Diagram
 * based on Coderbits.com feed
 *
 **/
var CBSkillsDiagram = function( options, callback ) {
  // TODO: filter and treat options argument a bit better
  var container = options.container;

  this.username  = container.data('cb-username');
  this.subject   = container.data('cb-subject') || 'skills';
  this.container = container;
  this.callback = callback;
  this.init();
};
CBSkillsDiagram.prototype.init = function() {
  var __self = this;

  // set loader
  __self.container.html('Crunching data.. Please wait');

  $.ajax({
    url: 'https://coderbits.com/' + __self.username + '.json',
    dataType: 'jsonp'
  }).done(function(data) {
    __self.createDom(data);
  });
};
CBSkillsDiagram.prototype.createDom = function(data) {
  var __self = this,
      subj = 'top_' + __self.subject,
      // Sort attributes in descendent order by count (just to be sure)
      attributes = data[subj].sort(function(a,b) {
        return b.count - a.count;
      }),
      items = [],
      total_score = 0;
  
  
  skill_level = 10; // begin with biggest skill level
  for (var item in attributes) {
    item = attributes[item];
    items.push({name: item.name, score: item.count, level: skill_level});    
    total_score += item.count;
    skill_level--;
  }
  
  // Shuffle
  for(var j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x);
  
  // Clean container contents
  __self.container.html('');
  
  // Render
  for (var i = 0; i < items.length; i++) {
    item = items[i];

    // Ignore too low score..
    if( item.score / total_score * 100 < 1 ) continue;

    $('<dt class="skill-' + item.level + '">' + item.name + '</dt>').appendTo(__self.container);
    $('<dd>' + item.score + '</dd>').appendTo(__self.container); 
  }

  // call callback
  if( typeof __self.callback === 'function' ) {
    __self.callback.call( null, __self );
  }
  
};

// Activate all diagrams
$(function() {
  $('.skills-diagram[data-cb-username]').each(function() {
    new CBSkillsDiagram( { container: $(this) } );
  });
});
