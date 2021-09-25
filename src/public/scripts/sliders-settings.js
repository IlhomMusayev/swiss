$('.single-slider').slick({
   autoplay: true,
   dots: true,
   autoplaySpeed: 2000
});

$('.news-slider').slick({
   dots: false,
   infinite: true,
   speed: 300,
   autoplaySpeed: 2000,
   autoplay: true,
   slidesToShow: 4,
   slidesToScroll: 1,
   responsive: [
      {
         breakpoint: 1225,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
         }
      },
      {
         breakpoint: 900,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1
         }
      },
      {
         breakpoint: 630,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1
         }
      }
   ]
});