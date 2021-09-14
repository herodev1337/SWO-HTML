$(document).ready(function(){
    $('body').css('padding-top', $('nav').css("height"));
    //$('section').css('padding-bottom', $('nav').css("height"));
    $(".main").onepage_scroll({
      sectionContainer: "section",
      responsiveFallback: 600,
      loop: false,
      pagination: false
    });

    $(".main").onepage_scroll({
        afterMove: function(index) {
            if(index === 1){
                $('*[class^="nav-caption"]').each(function( index ) {
                    $(this).removeClass('d-none');
                  });
              }else{
                $('*[class^="nav-caption"]').each(function( index ) {
                    $(this).addClass('d-none');
                  });
              }
              $('body').css('padding-top', $('nav').css("height"));
              //
              //$('section').css('padding-bottom', $('nav').css("height"));
        }
      });
      /*$(".section").map(function() {
        
        if($(this).attr('class').includes("active")){
            return;
        }else{
            $('#page-' + index).css('padding-bottom', $('nav').css("height"));
        }
    }).get();*/
});
