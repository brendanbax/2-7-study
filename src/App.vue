<template>
  <div class="container">
    <router-view />
    <ThemeToggle />
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue';

export default {
  name: 'App',
  components: {
    ThemeToggle,
  },
  mounted() {
    this.$store.dispatch('getTheme');
    this.$store.dispatch('getTranslation');
  }
}
</script>

<style>
:root {
  --orange: #FFA62B;
}
.dark {
  --bg: #2b313b;
  --fg: #dfceb8;
}
.light {
  --bg: #EDF4ED;
  --fg: #3D5467;
}

* {
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--fg);
  margin: 0;
}

.container {
  max-width: 480px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 5rem;
}
</style>
