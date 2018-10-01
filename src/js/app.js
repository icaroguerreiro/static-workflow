(function($) {
  target = $(".animation-virgem");
  interval = .1;
  
  target.click(function() {
    $(this).toggleClass("open");
  });
  target.find('.animation-virgem-elements').each(function() {
    var tdelay = 0;
    $(this).find("> *").each(function() {
      $(this).css("transition-delay", tdelay+"s");
      tdelay += interval;
    });
  })
})(jQuery);
