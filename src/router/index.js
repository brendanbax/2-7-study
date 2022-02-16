import { createRouter, createWebHashHistory } from "vue-router";

import BlankPageScreen from '../views/BlankPageScreen.vue';
import HomeScreen from '../views/HomeScreen.vue';
import FillBlankScreen from '../views/FillBlankScreen.vue';
import FirstLetterScreen from '../views/FirstLetterScreen.vue';
import FlashcardScreen from '../views/FlashcardScreen.vue';
import MatchScreen from '../views/MatchScreen.vue';

const routes = [
  {
    path: '/fill-in-the-blank',
    component: FillBlankScreen,
    name: 'Fill In The Blank',
  },
  {
    path: '/first-letter',
    component: FirstLetterScreen,
    name: 'First Letter',
  },
  {
    path: '/flash-cards',
    component: FlashcardScreen,
    name: 'Flash Cards',
  },
  {
    path: '/match',
    component: MatchScreen,
    name: 'Matching',
  },
  {
    path: '/blank-page',
    component: BlankPageScreen,
    name: 'Blank Page',
  },
  {
    path: '/',
    component: HomeScreen,
    name: 'Home',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;