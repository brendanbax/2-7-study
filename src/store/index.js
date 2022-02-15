import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: 'dark',
    translation: 'ESV',
  },
  mutations: {
    setTheme(state, val) {
      state.theme = val;
    },
    setTranslation(state, val) {
      state.translation = val;
    }
  },
  actions: {
    async getTheme({ dispatch }) {
      let theme = await localStorage.getItem('theme');
      if (!theme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        theme = prefersDark ? 'dark' : 'light'
      }
      dispatch('setTheme', theme);
    },
    async setTheme(context, val) {
      await localStorage.setItem('theme', val);
      const body = document.querySelector('body');

      body.classList.remove('light');
      body.classList.remove('dark');

      body.classList.add(val);
      context.commit('setTheme', val);
    },
    async getTranslation({ dispatch }) {
      let translation = await localStorage.getItem('translation');
      if (!translation) {
        translation = 'ESV';
      }
      dispatch('setTranslation', translation);
    },
    async setTranslation(context, val) {
      await localStorage.setItem('translation', val);
      context.commit('setTranslation', val);
    }
  },
})