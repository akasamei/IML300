$(document).ready(function () {
  const $menuButton = $('.menu-button');
  const $menu = $('.menu');
  const $cover = $('.cover');
  const $crown = $('#crown-img'); 

  function toggleMenu() {
    $menuButton.toggleClass('open');
    $menu.toggleClass('open');
    $cover.toggleClass('visible');
  }

  $menuButton.on('click', toggleMenu);
  $crown.on('click', toggleMenu);
  $cover.on('click', toggleMenu);
});
