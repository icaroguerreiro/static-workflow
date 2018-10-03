(function($) {
  $(document).ready(function() {
    $('.animate').addClass('animate-onload');
  });
  $(document).click(function() {
    $('.animate').addClass('animate-onclick');
  });
  $(window).scroll(function(d,h) {
    var screen = this;
    var screenHeight = $( window ).height();
    $('.animate').each(function(i) {
        if (jQuery(screen).scrollTop() >= ($(this).offset().top) - (screenHeight/100)*100 ) {
            $(this).addClass('animate-onscroll');
        }
    });
  });
})(jQuery);
