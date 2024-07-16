import Swiper from 'swiper';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { getRandomRecipe } from './recipes';
import { createImage } from './domUpdates';

//import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const slideNodes = document.querySelectorAll('.swiper-slide');

const updateSlide = (node, recipe) => {
  node.id = `${recipe.id}-slide`;

  const title = document.createElement('p');
  title.innerText = recipe.name;
  node.appendChild(title);

  const imgContainer = document.createElement('div');
  const img = createImage(recipe.image, `${recipe.name} dish`);
  imgContainer.appendChild(img);

  node.appendChild(imgContainer);
};

const populateSwiperSlides = recipes => {
  const usedRecipeIDs = [];
  slideNodes.forEach(node => {
    let randomRecipe = getRandomRecipe(recipes);

    while (usedRecipeIDs.includes(randomRecipe.id)) {
      randomRecipe = getRandomRecipe(recipes);
    }

    usedRecipeIDs.push(randomRecipe.id);

    updateSlide(node, randomRecipe);
  });
};

export const createSlider = recipes => {
  populateSwiperSlides(recipes);
  const swiper = new Swiper('.recipe-swiper', {
    modules: [Pagination, EffectCoverflow, Autoplay],
    createElements: true,
    effect: 'coverflow',
    allowTouchMove: true,
    autoHeight: true,
    grabCursor: true,
    centeredSlides: true,
    //loop: true,
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
