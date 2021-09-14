$(document).ready(function() {
    $('.main-container').css('padding-top', $('nav').css("height"));
});
window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $('*[class^="nav-caption"]').each(function(index) {
            $(this).addClass('d-none');
        });
    } else {
        $('*[class^="nav-caption"]').each(function(index) {
            $(this).removeClass('d-none');
        });
    }
    $('.main-container').css('padding-top', $('nav').css("height"));
};