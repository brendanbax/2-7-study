<template>
  <button id="fab" @click="updateTheme">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" id="icon">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"/>
    </svg>
  </button>
</template>

<script>
  export default {
    name: "ThemeToggle",
    data() {
      return {
        theme: 'dark',
      }
    },
    async mounted() {
      await this.$store.dispatch('getTheme');
      this.theme = this.$store.state.theme;
    },
    methods: {
      updateTheme() {
        console.log(this.theme);
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        console.log(this.theme);
        this.$store.dispatch('setTheme', this.theme);
      }
    }
  }
</script>

<style scoped>
#fab {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  background-color: var(--bg);
  border: 2px solid var(--orange);
  border-radius: 50%;
}
#icon {
  fill: var(--fg);
}
</style>