<template>
  <div class="container">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
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
  --ghost: #454d5a;
  --shadow: 0 1rem 1.5rem -.375rem rgba(0,0,0,0.5);
}
.light {
  --bg: #EDF4ED;
  --fg: #3D5467;
  --ghost: #e2e2e2;
  --shadow: 0 0.875rem 1.25rem -.25rem rgba(0,0,0,0.23);
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

.title {
  font-size: 1.25rem;
  font-weight: bold;
}
.text {
  font-size: 1.125rem;
  line-height: 1.5;
}
.reference {
  font-style: italic;
  font-size: 1rem;
  margin-top: 1rem;
}

@media screen and (max-width: 365px) {
  .title {
    font-size: 1.125rem;
  }
  .text {
    font-size: 1rem;
  }
  .reference {
    font-size: .95rem;
  }
}

</style>
