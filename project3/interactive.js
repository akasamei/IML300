$(document).ready(function () {
 
  $('.toggle-image').click(function () {
    const $img = $(this);
    const currentSrc = $img.attr('src');
    const altSrc = $img.attr('data-alt-src');

  
    $img.attr('src', altSrc);
    $img.attr('data-alt-src', currentSrc);
  });
});
