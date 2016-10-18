// Panel 1
jQuery(document).ready(function($) {
  //open the lateral panel
  $('.rules-a').on('click', function(event) {
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
  });
  //close the lateral panel
  $('.cd-panel').on('click', function(event) {
    if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();
    }
  });
});
// Panel 2
jQuery(document).ready(function($) {
  //open the lateral panel
  $('.calc-a').on('click', function(event) {
    event.preventDefault();
    $('.cd-panel-calc').addClass('is-visible');
  });
  //close the lateral panel
  $('.cd-panel-calc').on('click', function(event) {
    if ($(event.target).is('.cd-panel-close')) {
      $('.cd-panel-calc').removeClass('is-visible');
      event.preventDefault();
    }
  });
});
// Panel 3
jQuery(document).ready(function($) {
  //open the lateral panel
  $('.tips-a').on('click', function(event) {
    event.preventDefault();
    $('.cd-panel-tips').addClass('is-visible');
  });
  //close the lateral panel
  $('.cd-panel-tips').on('click', function(event) {
    if ($(event.target).is('.cd-panel-tips') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel-tips').removeClass('is-visible');
      event.preventDefault();
    }
  });
});
