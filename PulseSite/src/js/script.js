$(document).ready(function() {

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('.catalog__content')
      .removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });



  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__catalog').eq(i).toggleClass('catalog-item__catalog_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');
});

var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false,
  });

  document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
  };

  document.querySelector('.next').onclick = function () {
    slider.goTo('next');
  };