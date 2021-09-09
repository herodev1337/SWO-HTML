window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $('*[class^="section"]').each(function( index ) {
            $(this).addClass('d-none');
          });
      } else {
        $('*[class^="section"]').each(function( index ) {
            $(this).removeClass('d-none');
          });
      }
};
