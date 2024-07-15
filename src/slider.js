import Swiper from 'swiper';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

//import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

export const createSlider = () => {
  const swiper = new Swiper('.recipe-swiper', {
    modules: [Pagination, EffectCoverflow, Autoplay],
    createElements: true,
    effect: 'coverflow',
    allowTouchMove: true,
    autoHeight: true,
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    autoplay: { delay: 3000 },
    coverflowEffect: {
      depth: 100,
      modifier: 1.2,
      rotate: 0,
      scale: 0.8,
      stretch: 0,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  });
};
