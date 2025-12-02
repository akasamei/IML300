$(document).ready(function () {
  // click-to-toggle for each image
  $('.toggle-image').click(function () {
    const $img = $(this);
    const currentSrc = $img.attr('src');
    const altSrc = $img.attr('data-alt-src');

    // swap src and data-alt-src
    $img.attr('src', altSrc);
    $img.attr('data-alt-src', currentSrc);
  });
});
