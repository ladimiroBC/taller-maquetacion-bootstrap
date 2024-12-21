document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    const category = this.getAttribute('data-category'); // Obtener el valor del atributo data-category
    window.location.href = `categorys.html?category=${category}`; // Redirigir a categorys.html con el parámetro
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('#responsiveCarousel');
  const indicators = document.querySelectorAll('.btn-list-carousel');
  
  carousel.addEventListener('slid.bs.carousel', function () {
    const activeIndex = [...carousel.querySelectorAll('.carousel-item')].indexOf(carousel.querySelector('.carousel-item.active'));

    indicators.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.add('active'); 
      } else {
        button.classList.remove('active');
      }
    });
  });
});
