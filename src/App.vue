<template>
  <div class="container">
    <NavBar />
    <router-view />
    <AppPrompt />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppPrompt from './components/AppPrompt.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AppPrompt
},
  mounted() {
    this.$store.dispatch('getTheme');
    this.$store.dispatch('getTranslation');
  }
}
</script>

<style>
.dark {
  --bg: #2b313b;
  --fg: #dfceb8;
  --ghost: #454d5a;
  --accent: #FFA62B;
  --success: #3ed478;
  --shadow: 0 1rem 1.5rem -.375rem rgba(0,0,0,0.5);
}
.light {
  --bg: #edf4ed;
  --fg: #3D5467;
  --ghost: #b5b5bb;
  --accent: #5643a8;
  --success: #2f9255;
  --shadow: 0 0.875rem 1.25rem -.25rem rgba(0,0,0,0.23);
}

* {
  box-sizing: border-box;
  transition: background 200ms, color 200ms;
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

button {
  font-family: inherit;
  background-color: var(--accent);
  color: var(--bg);
  border: none;
  border-radius: .25rem;
  padding: .5rem .75rem;
  font-size: .9rem;
  letter-spacing: .5px;
  cursor: pointer;
}
button:nth-child(2) {
  margin-left: 1rem;
}
button.secondary {
  background-color: var(--bg);
  color: var(--accent);
  border: .125rem solid var(--accent);
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
