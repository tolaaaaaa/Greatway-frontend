// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';


const swiper = new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 48,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});