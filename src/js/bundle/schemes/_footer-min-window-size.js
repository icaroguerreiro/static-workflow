(function($) {
  $(window).on("load", function(){
    var diff = $( window ).height() - $("#page-content").offset().top - $("#page-footer").height();
    $("#page-content").css("min-height", diff);
  });
})(jQuery);
